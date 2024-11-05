import {setup, unhandledError, unhandledRoute} from 'appscape';
import {entries} from './entries';

let app = await setup();

app.use(
    entries,
    unhandledRoute(),
    unhandledError(),
);
