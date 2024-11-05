#!/usr/bin/env node
import {join} from 'node:path';
import type {Config} from './types/Config';
import {initFiles} from './utils/initFiles';
import {initPackageJSON} from './utils/initPackageJSON';

export async function run() {
    let config: Config = {
        ownDir: join(__dirname, '..'),
        targetDir: process.argv[2] || process.cwd(),
    };

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
