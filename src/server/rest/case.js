module.exports = class CaseRestResource {
    /**
     * @param {*} sfdc Salesforce client
     */
    constructor(sfdc) {
        this.sfdc = sfdc;
    }

    /**
     * Creates a case
     * @param {*} request
     * @param {*} response
     */
    createCase(request, response) {
        if (!request.body) {
            response.status(400).json({ message: 'Missing data.' });
            return;
        }

        this.sfdc.sobject('Case').insert(request.body, (error, result) => {
            if (error || !result.success) {
                console.error(error, result);
                response.status(500).json({ message: 'Failed to create case' });
            } else {
                console.log('Created case', request.body);
                response.sendStatus(200);
            }
        });
    }
};
