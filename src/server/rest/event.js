module.exports = class EventRestResource {
    /**
     * @param {*} sfdc Salesforce client
     */
    constructor(sfdc) {
        this.sfdc = sfdc;
    }

    /**
     * Publishes a platform event
     * @param {*} request
     * @param {*} response
     */
    publishPlatformEvent(request, response) {
        if (!request.body) {
            response.status(400).json({ message: 'Missing data.' });
            return;
        }

        this.sfdc
            .sobject('Robot_Event__e')
            .insert(request.body, (error, result) => {
                if (error || !result.success) {
                    console.error(error, result);
                    response
                        .status(500)
                        .json({ message: 'Failed to publish Robot_Event__e' });
                } else {
                    console.log('Published Robot_Event__e', request.body);
                    response.sendStatus(200);
                }
            });
    }
};
