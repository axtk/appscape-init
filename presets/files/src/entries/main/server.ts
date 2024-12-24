import {Router, static as expressStatic} from 'express';
import {dir} from 'appscape';

export let server = Router();

server.use('/main/-', expressStatic('src/entries/main/public'));

server.get('/:name?', dir({
    path: 'src/entries/main/content',
    index: 'intro',
}));
