import { fetchJson } from 'utils/fetch';

/**
 * Get device from type
 * @param {string} type
 * @returns {Promise<*>} Promise holding the Device record
 */
export function getDeviceFromType(type) {
    return fetch(`/api/devices?type=${type}`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(fetchJson);
}

/**
 * Get device picture id
 * @param {string} deviceId
 * @returns {Promise<*>} Promise holding the an object holding the pictude id
 */
export function getDevicePictureId(deviceId) {
    return fetch(`/api/devices/${deviceId}/picture`, {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(fetchJson);
}
