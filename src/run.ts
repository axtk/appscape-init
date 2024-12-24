#!/usr/bin/env node
import {getConfig} from './utils/getConfig';
import {initFiles} from './utils/initFiles';
import {initPackageJSON} from './utils/initPackageJSON';
import {truncatePath} from './utils/truncatePath';

export async function run() {
    let config = await getConfig();

    console.log(`Preset: ${truncatePath(config.presetDir)}`);
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
