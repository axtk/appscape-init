import {Display} from './Display';
import {MinusButton} from './MinusButton';
import {PlusButton} from './PlusButton';
import './index.css';

export const Counter = () => (
    <>
        <p>Below is the counter demo showcasing interactivity brought by a plain JS script to an SSR page.</p>
        <p className="counter">
            <MinusButton/>{' '}<Display/>{' '}<PlusButton/>
        </p>
    </>
);
