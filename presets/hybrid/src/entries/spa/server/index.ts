import {Router} from 'express';
import {render} from './render';

export let server = Router();

server.get('/spa/:section(about)?', render());
