import {setup, unhandledError, unhandledRoute} from 'appscape';
import {server, init} from './entries';

let app = setup(init);

app.use(
    server,
    unhandledRoute(),
    unhandledError(),
);
