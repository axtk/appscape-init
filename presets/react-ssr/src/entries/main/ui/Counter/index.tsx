import {Display} from './Display';
import {MinusButton} from './MinusButton';
import {PlusButton} from './PlusButton';
import './index.css';

export const Counter = () => (
    <p className="counter">
        <MinusButton/>{' '}<Display/>{' '}<PlusButton/>
    </p>
);
