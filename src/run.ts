#!/usr/bin/env node
import {cp, readdir, readFile, writeFile} from 'node:fs/promises';
import {exec} from 'node:child_process';
import {promisify} from 'node:util';
import {basename, dirname, join} from 'node:path';
import scripts from './scripts.json';

const execAsync = promisify(exec);

let ownDir = dirname(require.resolve('appscape-init/package.json'));
let projectDir = process.cwd();

const deps = [
    'express',
];

const devDeps = [
    '@types/node',
    'appscape',
    'cross-env',
    'nodemon',
    'npm-run-all',
];

function getJSONTabSize(s: string) {
    return s.match(/^(\s*)"name":/m)?.[1]?.length ?? 2;
}

async function initPackageJSON() {
    let path = join(projectDir, 'package.json');
    let content = '', value: Record<string, unknown> = {};

    try {
        content = (await readFile(path)).toString();
    }
    catch {}

    try {
        value = JSON.parse(content);
    }
    catch {}

    value.scripts = {
        ...scripts,
        ...(typeof value.scripts === 'object' ? value.scripts : undefined),
    };

    if (!value.name)
        value.name = basename(projectDir);

    if (!value.version)
        value.version = '0.0.1';

    await writeFile(
        path,
        JSON.stringify(value, null, getJSONTabSize(content)),
    );

    await execAsync(`cd ${projectDir}`);
    await execAsync(`npm i ${deps.join(' ')}`);
    await execAsync(`npm i -D ${devDeps.join(' ')}`);
}

async function initFiles() {
    let items = await readdir(join(ownDir, 'demo'));

    await Promise.all(
        items.map(item => cp(join(ownDir, 'demo', item), projectDir)),
    );
}

export async function run() {
    let args = process.argv.slice(2);

    if (args[0])
        projectDir = args[0];

    await initPackageJSON();
    await initFiles();

    console.log('Application prepared!');
    console.log('Run "npm start" to start the development build.');
    console.log('Run "npm run prod" to start the production build.');
}

(async () => {
    await run();
})();
