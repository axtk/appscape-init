import {cp, readdir} from 'node:fs/promises';
import {join} from 'node:path';

export async function initFiles(targetDir: string) {
    let ownDir = join(__dirname, '../..');
    let items = await readdir(join(ownDir, 'demo'));

    await Promise.all(
        items.map(item => {
            let targetItem = item === '_tsconfig.json'
                ? 'tsconfig.json'
                : item;

            return cp(
                join(ownDir, 'demo', item),
                join(targetDir, targetItem),
                {recursive: true},
            );
        }),
    );
}
