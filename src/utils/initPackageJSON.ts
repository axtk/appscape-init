import {access, mkdir, writeFile} from 'node:fs/promises';
import {basename, join} from 'node:path';
import {exec} from 'node:child_process';
import {promisify} from 'node:util';
import scripts from '../const/scripts.json';
import type {Config} from '../types/Config';
import {readJSON} from './readJSON';
import {toDepList} from './toDepList';

const execAsync = promisify(exec);

type PJ = {
    name?: string;
    version?: string;
    main?: string;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
};

export async function initPackageJSON({targetDir, presetDir}: Config) {
    let targetPJPath = join(targetDir, 'package.json');

    let {
        scripts: originalScripts,
        ...originalPJ
    } = ((await readJSON(targetPJPath)) ?? {}) as PJ;

    let {
        dependencies,
        devDependencies,
        peerDependencies,
        scripts: presetScripts,
        ...presetPJ
    } = (
        (await readJSON(join(presetDir, 'package.json'))) ??
        (await readJSON(join(presetDir, '_package.json'))) ??
        {}
    ) as PJ;

    let targetPJ: PJ = {
        name: basename(targetDir),
        version: '0.0.1',
        main: 'dist/main/index.js',
        scripts: {
            ...(presetScripts ?? scripts),
            ...(typeof originalScripts === 'object' ? originalScripts : undefined),
        },
        ...presetPJ,
        ...originalPJ,
    };

    try {
        await access(targetDir);
    }
    catch {
        await mkdir(targetDir, {recursive: true});
    }

    await writeFile(
        targetPJPath,
        JSON.stringify(targetPJ, null, 2),
    );

    let deps = [
        ...toDepList(dependencies),
        ...toDepList(peerDependencies),
    ];

    let devDeps = toDepList(devDependencies);

    if (deps.length !== 0)
        await execAsync(`npm i --prefix ${targetDir} ${deps.join(' ')}`);

    if (devDeps.length !== 0)
        await execAsync(`npm i -D --prefix ${targetDir} ${devDeps.join(' ')}`);
}
