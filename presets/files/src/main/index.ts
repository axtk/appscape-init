import {setup, unhandledError, unhandledRoute} from 'appscape';
import {entries} from './entries';

let app = setup();

app.use(
    entries,
    unhandledRoute(),
    unhandledError(),
);
