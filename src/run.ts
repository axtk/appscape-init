#!/usr/bin/env node
import {initFiles} from './utils/initFiles';
import {initPackageJSON} from './utils/initPackageJSON';

export async function run() {
    let args = process.argv.slice(2);
    let targetDir = args[0] || process.cwd();

    console.log('Initializing "package.json"');
    await initPackageJSON(targetDir);

    console.log('Initializing files');
    await initFiles(targetDir);

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
