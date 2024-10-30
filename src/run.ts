#!/usr/bin/env node
import {access, cp, mkdir, readdir, readFile, writeFile} from 'node:fs/promises';
import {exec} from 'node:child_process';
import {promisify} from 'node:util';
import {basename, join} from 'node:path';
import scripts from './scripts.json';

const execAsync = promisify(exec);

let ownDir = join(__dirname, '..');
let targetDir = process.cwd();

const deps = [
    'appscape',
    'express',
];

const devDeps = [
    '@types/express',
    '@types/node',
    'appscape-build',
    'cross-env',
    'nodemon',
    'npm-run-all',
];

function getJSONTabSize(s: string) {
    return s.match(/^(\s*)"name":/m)?.[1]?.length ?? 2;
}

async function initPackageJSON() {
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

async function initFiles() {
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

export async function run() {
    let args = process.argv.slice(2);

    if (args[0])
        targetDir = args[0];

    console.log('Initializing "package.json"');
    await initPackageJSON();

    console.log('Initializing files');
    await initFiles();

    console.log();
    console.log('Application prepared!');

    console.log();
    console.log(`In "${targetDir}":`);
    console.log('- run "npm start" to start the development build;');
    console.log('- run "npm run prod" to start the production build.');
}

(async () => {
    await run();
})();
