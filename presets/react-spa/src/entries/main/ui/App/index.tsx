import {Store} from 'groundstate';
import {Router} from 'routescape';
import type {AppState} from '../../types/AppState';
import {AppContext} from '../AppContext';
import {Content} from './Content';

export type AppProps = {
    state: AppState;
    location?: string;
};

export const App = ({state, location}: AppProps) => (
    <Router location={location}>
        <AppContext.Provider value={new Store(state)}>
            <Content/>
        </AppContext.Provider>
    </Router>
);
