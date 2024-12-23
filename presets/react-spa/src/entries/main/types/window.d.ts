/* eslint-disable @typescript-eslint/consistent-type-definitions */
import {AppState} from './AppState';

declare global {
    interface Window {
        _mainState: AppState;
    }
}
