import {Router, static as expressStatic} from 'express';
import {render} from './render';

export let server = Router();

server.use('/main', expressStatic('src/entries/main/public'));

server.get('/:section(about)?', render());
