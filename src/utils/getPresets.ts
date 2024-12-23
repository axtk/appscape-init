import {readdir} from 'node:fs/promises';
import {join} from 'node:path';
import type {Config} from '../types/Config';
import type {Preset} from '../types/Preset';

export async function getPresets({ownDir}: Config) {
    return readdir(join(ownDir, 'presets')) as Promise<Preset[]>;
}
