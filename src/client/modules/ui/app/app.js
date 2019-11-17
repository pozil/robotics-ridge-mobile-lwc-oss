/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable no-console */
import { LightningElement } from 'lwc';
import { getDeviceFromType, getDevicePictureId } from 'services/device';
import { publishPlatformEvent } from 'services/event';
import { createCase } from 'services/case';
import { WebSocketClient } from 'utils/webSocketClient';
import {
    STEPS,
    EVENT_ULTIMATE_PICKUP_REQUESTED,
    EVENT_ULTIMATE_PAYLOAD_MISSING,
    EVENT_ULTIMATE_PAYLOAD_IDENTIFIED,
    EVENT_ULTIMATE_PAYLOAD_DELIVERED,
    EVENT_ARM_PICKUP_CONFIRMED,
    EVENT_ARM_PICKUP_COMPLETED,
    EVENT_TRAIN_RESET
} from 'utils/constants';

export default class App extends LightningElement {
    isLocked = true;
    devicePictureId;
    payload;
    currentStepName;
    device;
    prediction;
    caseData;
    ws;
    feedId;
    events = []; // Archives received events

    steps = STEPS;

    connectedCallback() {
        // Get WebSocket URL
        const wsUrl =
            (window.location.protocol === 'http:' ? 'ws://' : 'wss://') +
            window.location.host;
        // Connect WebSocket
        this.ws = new WebSocketClient(wsUrl);
        this.ws.connect();
        this.ws.addMessageListener(message => {
            this.handleWsMessage(message);
        });

        // Get initial device
        getDeviceFromType('Ultimate')
            .then(device => {
                this.device = device;
                this.feedId = device.Feed__c;
                this.isLocked = false;
            })
            .catch(error => {
                console.error(JSON.stringify(error));
                throw new Error('Failed to retrieve initial device');
            });
    }

    handleWsMessage(event) {
        const eventData = event.data.payload;
        console.log('Event received', eventData);
        // Check that we are receiving event for the right feed
        if (this.feedId !== eventData.Feed_Id__c) {
            return;
        }
        // Force screen lock and clear previous data
        this.isLocked = true;
        this.prediction = undefined;
        this.devicePictureId = undefined;
        // Archive events
        if (eventData.Event__c === EVENT_ULTIMATE_PICKUP_REQUESTED) {
            this.events = [];
        }
        this.events.push(eventData);
        // Process event
        const eventType = eventData.Event__c;
        this.currentStepName = eventType;

        switch (eventType) {
            case EVENT_ULTIMATE_PAYLOAD_MISSING:
                // Close progress view in 1s
                setTimeout(() => {
                    this.isLocked = false;
                    this.caseData = {
                        Subject: 'Missing payload',
                        Description: `Payload could not be found.`,
                        Comments: 'Issue detected by Einstein Vision',
                        Origin: 'Web'
                    };
                }, 1000);
                break;
            case EVENT_ULTIMATE_PAYLOAD_IDENTIFIED:
                this.displayDevicePicture(eventData);
                break;
            case EVENT_ULTIMATE_PAYLOAD_DELIVERED:
                // Clear device picture in 1s
                setTimeout(() => {
                    this.devicePictureId = undefined;
                }, 1500);
                break;
            case EVENT_ARM_PICKUP_CONFIRMED:
                this.displayDevicePicture(eventData);
                break;
            case EVENT_ARM_PICKUP_COMPLETED:
                // Clear device picture in 1s
                setTimeout(() => {
                    this.devicePictureId = undefined;
                }, 1500);
                break;
            case EVENT_TRAIN_RESET:
                // Close progress view in 0.5s
                setTimeout(() => {
                    this.closeProgressView();
                }, 500);
                break;
            default:
                break;
        }
    }

    handlePickupClick() {
        if (this.isLocked) {
            return;
        }

        this.isLocked = true;
        this.currentStepName = this.steps[0].name;
        this.prediction = undefined;
        this.devicePictureId = undefined;
        // Publish PE
        const data = {
            Event__c: EVENT_ULTIMATE_PICKUP_REQUESTED,
            Device_Id__c: this.device.Id,
            Feed_Id__c: this.device.Feed__c,
            Payload__c: this.payload
        };
        publishPlatformEvent(data).catch(error => {
            console.error(JSON.stringify(error));
            throw new Error('Failed to publish pickup Platform Event');
        });
    }

    handleCaseSave(event) {
        this.caseData = undefined;
        createCase(event.detail).catch(error => {
            console.error(JSON.stringify(error));
            throw new Error('Failed to create case');
        });
    }

    handleCaseCancel() {
        this.caseData = undefined;
    }

    // Internal functions
    displayDevicePicture(eventData) {
        // Get picture
        getDevicePictureId(eventData.Device_Id__c)
            .then(data => {
                this.devicePictureId = data.pictureId;
            })
            .catch(error => {
                console.error(JSON.stringify(error));
                throw new Error(
                    `Failed to retrieve picture from device ${eventData.Device_Id__c}`
                );
            });
        // Set and display prediction
        this.prediction = JSON.parse(eventData.Prediction__c);
    }

    closeProgressView() {
        this.isLocked = false;

        // Get requested and identified payload
        const payloadIdentifiedEvent = this.events.find(
            e => e.Event__c === EVENT_ULTIMATE_PAYLOAD_IDENTIFIED
        );
        if (payloadIdentifiedEvent === undefined) {
            console.warn(
                `Couldn't find ${EVENT_ULTIMATE_PAYLOAD_IDENTIFIED} event in local cache`
            );
            return;
        }
        const prediction = JSON.parse(payloadIdentifiedEvent.Prediction__c);
        const payloadRequested = payloadIdentifiedEvent.Payload__c;
        const payloadIdentified = prediction.probabilities[0].label;

        // Redirect to case creation if we made an incorrect delivery
        if (payloadRequested !== payloadIdentified) {
            this.caseData = {
                Subject: 'Incorrect delivery',
                Description: `Customer requested ${payloadRequested} but received ${payloadIdentified}.`,
                Comments: 'Issue detected by Einstein Vision',
                Origin: 'Web'
            };
        }
    }

    // UI Expressions
    get bgContainerClasses() {
        return this.devicePictureId || this.caseData
            ? 'slds-hide'
            : 'bg-container';
    }

    get devicePictureUrl() {
        return `/api/device-pictures/${this.devicePictureId}`;
    }
}
