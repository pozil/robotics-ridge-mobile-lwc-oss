/**
 * Creates a case
 * @param {*} caseData
 * @returns {Promise<*>} Promise holding the Case record
 */
export function createCase(caseData) {
    return fetch(`/api/cases`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(caseData)
    });
}
