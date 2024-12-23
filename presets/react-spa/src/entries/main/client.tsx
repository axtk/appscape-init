import {hydrateRoot} from 'react-dom/client';
import {App} from './ui/App';

hydrateRoot(document, <App state={window._mainState}/>);
