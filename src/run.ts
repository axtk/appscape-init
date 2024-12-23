#!/usr/bin/env node
import {join} from 'node:path';
import type {Config} from './types/Config';
import {getPresets} from './utils/getPresets';
import {initFiles} from './utils/initFiles';
import {initPackageJSON} from './utils/initPackageJSON';

export async function run() {
    let config: Config = {
        ownDir: join(__dirname, '..'),
        targetDir: process.cwd(),
        preset: 'blank',
    };

    let presets = await getPresets(config);

    for (let i = 2; i < process.argv.length; i++) {
        let arg = process.argv[i];

        if (presets.some(preset => arg === `--${preset}`))
            config.preset = arg.slice(2) as Config['preset'];
        else if (arg)
            config.targetDir = arg;
    }

    console.log('Initializing application...');
    await initPackageJSON(config);
    await initFiles(config);

    console.log();
    console.log('Application prepared!');

    console.log();
    console.log(`In "${config.targetDir}":`);
    console.log('- run "npm start" to start the development build;');
    console.log('- run "npm run prod" to start the production build.');
}

(async () => {
    await run();
})();
