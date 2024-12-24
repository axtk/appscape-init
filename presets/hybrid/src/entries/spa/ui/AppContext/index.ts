import {createContext} from 'react';
import type {Store} from 'groundstate';
import type {AppState} from '../../types/AppState';

export const AppContext = createContext(null as unknown as Store<AppState>);
