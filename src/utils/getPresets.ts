import {readdir} from 'node:fs/promises';
import {join} from 'node:path';
import type {Config} from '../types/Config';

export async function getPresets({ownDir}: Pick<Config, 'ownDir'>) {
    return readdir(join(ownDir, 'presets'));
}
