import {cp, readdir} from 'node:fs/promises';
import {join} from 'node:path';
import type {Config} from '../types/Config';

export async function initFiles({ownDir, targetDir, preset}: Config) {
    let items = await readdir(join(ownDir, 'presets', preset));

    await Promise.all(
        items.map(item => {
            let targetItem = item === '_tsconfig.json'
                ? 'tsconfig.json'
                : item;

            return cp(
                join(ownDir, 'presets', preset, item),
                join(targetDir, targetItem),
                {recursive: true},
            );
        }),
    );
}
