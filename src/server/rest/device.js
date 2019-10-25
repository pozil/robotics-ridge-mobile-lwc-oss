const stream = require('stream');

module.exports = class DeviceRestResource {
    /**
     * @param {*} sfdc Salesforce client
     */
    constructor(sfdc) {
        this.sfdc = sfdc;
    }

    /**
     * Get device
     * @param {*} request
     * @param {*} response
     */
    getDevice(request, response) {
        const { type } = request.query;
        if (!type) {
            response.status(400).json({ message: 'Missing type parameter.' });
            return;
        }

        const soql = `SELECT Id, Name, Hostname__c, Feed__c, Picture_Prediction__c, Last_Known_IP__c FROM Device__c WHERE Type__c = '${type}'`;
        this.sfdc.query(soql, (error, result) => {
            if (error) {
                console.error('getDevice', error);
                response.status(500).json(error);
            } else if (result.records.length !== 1) {
                const message = 'Could not retrieve device.';
                console.error('getDevice', message);
                response.status(404).json({ message });
            } else {
                response.json(result.records[0]);
            }
        });
    }

    /**
     * Get device picture id
     * @param {*} request
     * @param {*} response
     */
    getDevicePictureId(request, response) {
        const { deviceId } = request.params;
        if (!deviceId) {
            response
                .status(400)
                .json({ message: 'Missing deviceId parameter.' });
            return;
        }

        const soql = `SELECT Picture_Id__c FROM Device__c WHERE Id = '${deviceId}'`;
        this.sfdc.query(soql, (error, result) => {
            if (error) {
                console.error('getDevicePictureId', error);
                response.status(500).json(error);
            } else if (result.records.length !== 1) {
                const message = 'Could not retrieve device picture id.';
                console.error('getDevicePictureId', message);
                response.status(404).json({ message });
            } else {
                const record = result.records[0];
                response.json({ pictureId: record.Picture_Id__c });
            }
        });
    }

    getDevicePicture(request, response) {
        const { pictureId } = request.params;
        if (!pictureId) {
            response
                .status(400)
                .json({ message: 'Missing pictureId parameter.' });
            return;
        }

        const inputStream = this.sfdc
            .sobject('ContentVersion')
            .record(pictureId)
            .blob('VersionData');
        const streamPassThrough = new stream.PassThrough();
        stream.pipeline(inputStream, streamPassThrough, error => {
            if (error) {
                console.error(error);
                response.sendStatus(400);
            }
        });
        streamPassThrough.pipe(response);
    }
};
