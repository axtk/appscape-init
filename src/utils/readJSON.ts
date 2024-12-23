import {readFile} from 'node:fs/promises';

export async function readJSON(path: string) {
    let content = '';
    let value: Record<string, unknown> | undefined = undefined;

    try {
        content = (await readFile(path)).toString();
    }
    catch {}

    try {
        value = JSON.parse(content);
    }
    catch {}

    return value;
}
