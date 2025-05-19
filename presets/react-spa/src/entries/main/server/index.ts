import {Router} from 'express';
import {render} from './render';

export let server = Router();

server.get('/{:section}', render());
