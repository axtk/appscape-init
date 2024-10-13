import {setup, unhandledError, unhandledRoute} from 'appscape';
import {routers} from '~/src/entries';

let app = setup();

app.use(
    routers,
    unhandledRoute(),
    unhandledError(),
);
