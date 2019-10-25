import { LightningElement, api } from 'lwc';

export default class CaseForm extends LightningElement {
    @api caseData;

    handleChange(event) {
        const { name, value } = event.target;
        this.caseData[name] = value;
    }

    handleSaveClick(event) {
        event.preventDefault();
        const saveEvent = new CustomEvent('save', {
            detail: this.caseData
        });
        this.dispatchEvent(saveEvent);
    }

    handleCancelClick() {
        this.dispatchEvent(new CustomEvent('cancel'));
    }
}
