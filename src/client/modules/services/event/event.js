/**
 * Publishes a Plaform Event
 * @param {*} event
 * @returns {Promise<*>} Promise holding the Device record
 */
export function publishPlatformEvent(event) {
    return fetch(`/api/events`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    });
}
