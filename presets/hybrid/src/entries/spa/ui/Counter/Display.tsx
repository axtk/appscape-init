import {useContext} from 'react';
import {useStore} from 'groundstate';
import {AppContext} from '../AppContext';

export const Display = () => {
    let [state] = useStore(useContext(AppContext));

    return <strong>{state.counter}</strong>;
};
