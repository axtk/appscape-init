import {setup, unhandledError, unhandledRoute} from 'appscape';
import {entries} from './entries';

(async () => {
    let app = await setup();

    app.use(
        entries,
        unhandledRoute(),
        unhandledError(),
    );
})();
