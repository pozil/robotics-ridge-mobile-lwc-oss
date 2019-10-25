module.exports = class Configuration {
    static isValid() {
        return (
            process.env.SF_USERNAME &&
            process.env.SF_PASSWORD &&
            process.env.SF_TOKEN &&
            process.env.SF_LOGIN_URL
        );
    }

    static getSfLoginUrl() {
        return process.env.SF_LOGIN_URL;
    }

    static getSfUsername() {
        return process.env.SF_USERNAME;
    }

    static getSfSecuredPassword() {
        return process.env.SF_PASSWORD + process.env.SF_TOKEN;
    }
};
