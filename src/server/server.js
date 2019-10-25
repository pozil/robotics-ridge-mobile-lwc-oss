const express = require('express'),
    path = require('path'),
    jsforce = require('jsforce'),
    Configuration = require('./utils/configuration.js'),
    WebSocketService = require('./utils/webSocketService.js'),
    DeviceRestResource = require('./rest/device.js'),
    EventRestResource = require('./rest/event.js'),
    CaseRestResource = require('./rest/case.js');

// Load and check config
require('dotenv').config();
if (!Configuration.isValid()) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}

// Configure and start express
const DIST_DIR = path.join(__dirname, '../../dist');
const app = express();
app.use(express.static(DIST_DIR));
app.use(express.json());

const wss = new WebSocketService();

// Connect to Salesforce
const sfdc = new jsforce.Connection({
    loginUrl: Configuration.getSfLoginUrl(),
    version: '47.0'
});
sfdc.login(
    Configuration.getSfUsername(),
    Configuration.getSfSecuredPassword(),
    error => {
        if (error) {
            console.error('Failed to connect to Salesforce org');
            console.error(error);
            process.exit(-1);
        }
    }
).then(() => {
    console.log('Connected to Salesforce');
    // Subscribe to Platform Event
    sfdc.streaming.topic('/event/Robot_Event__e').subscribe(event => {
        // Notify client via WebSocket
        const message = {
            type: 'robotEvent',
            data: event
        };
        wss.broadcast(message);
    });
});

// Setup Device REST resources
const deviceRest = new DeviceRestResource(sfdc);
app.get('/api/devices', (request, response) => {
    deviceRest.getDevice(request, response);
});
app.get('/api/devices/:deviceId/picture', (request, response) => {
    deviceRest.getDevicePictureId(request, response);
});
app.get('/api/device-pictures/:pictureId', (request, response) => {
    deviceRest.getDevicePicture(request, response);
});

// Setup Event REST resources
const eventRest = new EventRestResource(sfdc);
app.post('/api/events', (request, response) => {
    eventRest.publishPlatformEvent(request, response);
});

// Setup Event REST resources
const caseRest = new CaseRestResource(sfdc);
app.post('/api/cases', (request, response) => {
    caseRest.createCase(request, response);
});

// HTTP and WebSocket Listen
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
wss.connect(server);
