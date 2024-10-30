import {access, mkdir, readFile, writeFile} from 'node:fs/promises';
import {exec} from 'node:child_process';
import {promisify} from 'node:util';
import {basename, join} from 'node:path';
import {deps} from '../const/deps';
import {devDeps} from '../const/devDeps';
import scripts from '../const/scripts.json';
import type {Config} from '../types/Config';
import {getJSONTabSize} from './getJSONTabSize';

const execAsync = promisify(exec);

export async function initPackageJSON({targetDir}: Config) {
    let path = join(targetDir, 'package.json');
    let content = '', value: Record<string, unknown> = {};

    try {
        content = (await readFile(path)).toString();
    }
    catch {}

    try {
        value = JSON.parse(content);
    }
    catch {}

    if (!value.name)
        value.name = basename(targetDir);

    if (!value.version)
        value.version = '0.0.1';

    if (!value.main)
        value.main = 'dist/main/index.js';

    value.scripts = {
        ...scripts,
        ...(typeof value.scripts === 'object' ? value.scripts : undefined),
    };

    try {
        await access(targetDir);
    }
    catch {
        await mkdir(targetDir, {recursive: true});
    }

    await writeFile(
        path,
        JSON.stringify(value, null, getJSONTabSize(content)),
    );

    await execAsync(`npm i --prefix ${targetDir} ${deps.join(' ')}`);
    await execAsync(`npm i -D --prefix ${targetDir} ${devDeps.join(' ')}`);
}
