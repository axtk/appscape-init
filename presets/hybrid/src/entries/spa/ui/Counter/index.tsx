import {Display} from './Display';
import {MinusButton} from './MinusButton';
import {PlusButton} from './PlusButton';
import './index.css';

export const Counter = () => (
    <>
        <p>Below is the counter demo showcasing the shared state management between the buttons and the value output and across pages of the SPA.</p>
        <p className="counter">
            <MinusButton/>{' '}<Display/>{' '}<PlusButton/>
        </p>
    </>
);
