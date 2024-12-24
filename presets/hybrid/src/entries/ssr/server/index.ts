import {Router, static as expressStatic} from 'express';
import {render} from './render';

export let server = Router();

server.use('/ssr/-', expressStatic('src/entries/ssr/public'));

server.get('/ssr/:section(about)?', render());
