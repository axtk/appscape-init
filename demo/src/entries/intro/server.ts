import {Router} from 'express';
import {render} from './render';

export let router = Router();

router.get('/', [
    render(),
]);
