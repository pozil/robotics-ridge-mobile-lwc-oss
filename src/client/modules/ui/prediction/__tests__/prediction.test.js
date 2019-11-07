import { createElement } from 'lwc';
import Prediction from 'ui/prediction';

// Sample data
const prediction_success = [
    {
        probabilities: {
            probability: 0.99901164,
            label: 'Paper',
            boundingBox: { minY: 463, minX: 307, maxY: 626, maxX: 426 }
        }
    }
];
/**const prediction_no_bounding = [
    {
        probabilities: {
            probability: 0.7761964,
            label: 'paper',
            boundingBox: null
        }
    }
];
const prediction_no = [];*/

describe('display-a-prediction', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('does not render prediction tiles by default', () => {
        // Create initial element
        const element = createElement('c-prediction', {
            is: Prediction
        });
        document.body.appendChild(element);

        const isStrengthIcon = element.shadowRoot.querySelectorAll(
            'c-strength-icon'
        );
        expect(isStrengthIcon.length).toBe(0);
        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('No result');
    });

    it('renders data with predictions ', () => {
        const element = createElement('c-prediction', {
            is: Prediction
        });
        element.rawPrediction = prediction_success;
        console.log(element.rawPrediction);
        document.body.appendChild(element);
        console.log(element);
        //Not a valid test
        //Need to test if the table renders or not, but not sure I'm even passing the data correctly.
        const p = element.shadowRoot.querySelector('p');
        expect(p.textContent).toBe('Prediction:');
    });

    /**it('renders data with predictions and no bounding', () => {
        
        const element = createElement('c-prediction',{
            is: Prediction
        });
        document.body.appendChild(element);
        prediction_no_bounding;
        expect(SOMETHING);
    });

    it('renders when prediction is empty', () => {
        const element = createElement('c-prediction',{
            is: Prediction
        });
        document.body.appendChild(element);
        prediction_no;
        
        expect(SOMETHING);
    });*/
});
