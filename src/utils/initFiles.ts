import {cp, readdir} from 'node:fs/promises';
import {join} from 'node:path';
import type {Config} from '../types/Config';

export async function initFiles({targetDir, presetDir}: Config) {
    let items = await readdir(presetDir);

    await Promise.all(
        items.map(item => {
            if (['package.json', '_package.json'].includes(item))
                return;

            let targetItem = item === '_tsconfig.json'
                ? 'tsconfig.json'
                : item;

            return cp(
                join(presetDir, item),
                join(targetDir, targetItem),
                {recursive: true},
            );
        }),
    );
}
