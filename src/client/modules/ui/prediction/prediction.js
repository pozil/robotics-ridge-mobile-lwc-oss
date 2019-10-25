import { LightningElement, api } from 'lwc';

export default class Prediction extends LightningElement {
    rawPrediction;
    probabilities = [];

    get prediction() {
        return this.rawPrediction;
    }

    @api
    set prediction(rawPrediction) {
        this.rawPrediction = rawPrediction;
        if (rawPrediction.probabilities.length > 0) {
            this.probabilities = rawPrediction.probabilities
                .filter(probabilityData => probabilityData.probability >= 0.001)
                .map((probabilityData, index) => {
                    const { probability, label } = probabilityData;
                    let boundingBox = null;
                    if (probabilityData.boundingBox !== null) {
                        boundingBox = {
                            centerX:
                                probabilityData.boundingBox.maxX -
                                probabilityData.boundingBox.minX,
                            centerY:
                                probabilityData.boundingBox.maxY -
                                probabilityData.boundingBox.minY
                        };
                    }
                    return {
                        index,
                        probability: Math.floor(probability * 100),
                        label,
                        boundingBox,
                        strength: Math.round(probability / 0.1666 - 3)
                    };
                });
        }
    }

    get hasPredictions() {
        return this.probabilities.length > 0;
    }

    get hasBoundingBox() {
        return this.probabilities[0].boundingBox !== null;
    }
}
