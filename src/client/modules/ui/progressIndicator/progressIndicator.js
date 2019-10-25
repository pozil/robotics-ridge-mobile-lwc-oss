import { LightningElement, api } from 'lwc';

export default class ProgressIndicator extends LightningElement {
    stepList = [];
    activeStepName;
    activeStepIndex;
    progress = 0;

    @api
    get steps() {
        return this.stepList;
    }

    set steps(stepValues) {
        this.stepList = stepValues.map(step => {
            return {
                name: step.name,
                label: step.label,
                isCompleted: false,
                cssClasses: 'slds-progress__item'
            };
        });
        this.progress = 0;
        this.activeStepIndex = undefined;
    }

    @api
    get activeStep() {
        return this.activeStepName;
    }

    set activeStep(activeStepName) {
        this.activeStepName = activeStepName;
        if (activeStepName === undefined) {
            return;
        }

        const activeStepIndex = this.stepList.findIndex(
            step => step.name === activeStepName
        );
        if (activeStepIndex === -1) {
            return;
        }
        this.activeStepIndex = activeStepIndex;
        this.stepList = this.stepList.map((step, stepIndex) => {
            const updatedStep = {
                name: step.name,
                label: step.label,
                isCompleted: false,
                cssClasses: 'slds-progress__item'
            };
            if (stepIndex < activeStepIndex) {
                updatedStep.isCompleted = true;
                updatedStep.cssClasses += ' slds-is-completed';
            } else if (stepIndex === activeStepIndex) {
                updatedStep.cssClasses += ' slds-is-active';
            }
            return updatedStep;
        });
        this.progress = Math.floor(
            (activeStepIndex / (this.stepList.length - 1)) * 100
        );
    }

    get activeStepLabel() {
        return this.activeStepIndex === undefined
            ? ''
            : this.stepList[this.activeStepIndex].label;
    }

    get progressBarWidth() {
        return `width: ${this.progress}%;`;
    }
}
