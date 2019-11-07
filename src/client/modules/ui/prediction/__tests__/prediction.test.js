import { createElement } from 'lwc';
import Prediction from 'ui/prediction';

// Sample data
const prediction_success = {
    probabilities: [
        {
            probability: 0.99901164,
            label: 'Paper',
            boundingBox: { minY: 463, minX: 307, maxY: 626, maxX: 426 }
        }
    ]
};
const prediction_no_bounding = {
    probabilities: [
        {
            probability: 0.7761964,
            label: 'paper',
            boundingBox: null
        }
    ]
};

describe('display-a-prediction', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('does not render prediction tiles by default', () => {
        const element = createElement('c-prediction', {
            is: Prediction
        });
        document.body.appendChild(element);

        const paragraphs = element.shadowRoot.querySelectorAll('p');
        expect(paragraphs.length).toBe(2);
    });

    it('renders data with predictions and no bounding', () => {
        const element = createElement('c-prediction', {
            is: Prediction
        });
        element.prediction = prediction_no_bounding;
        document.body.appendChild(element);
        return Promise.resolve().then(() => {
            const data = element.shadowRoot.querySelectorAll('td');
            expect(data.length).toBe(3);
        });
    });

    it('renders data with predictions and bounding ', () => {
        const element = createElement('c-prediction', {
            is: Prediction
        });
        element.prediction = prediction_success;
        document.body.appendChild(element);
        return Promise.resolve().then(() => {
            const data = element.shadowRoot.querySelectorAll('td');
            expect(data.length).toBe(4);
        });
    });
});
