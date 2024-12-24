import {Router, static as expressStatic} from 'express';
import {dir} from 'appscape';

export let server = Router();

server.use('/files/-', expressStatic('src/entries/files/public'));

server.get('/files/:name?', dir({
    path: 'src/entries/files/content',
    index: 'intro',
}));

server.get('/', dir({
    path: 'src/entries/files/content',
    name: 'index',
}));
