import {access} from 'node:fs/promises';
import {join} from 'node:path';
import type {Config} from '../types/Config';
import {getPresets} from './getPresets';

let defaultPreset = 'hybrid';

export async function getConfig(): Promise<Config> {
    let args = process.argv.slice(2);
    let ownDir = join(__dirname, '..');
    let presets = await getPresets({ownDir});

    if (args.includes('--help')) {
        let presetList = presets
            .map(x => `  --${x}${x === defaultPreset ? ' (default)' : ''}`)
            .join('\n') +
            '\n  <custom_preset_directory>';

        console.log(
            'npx appscape-init <target_directory> [<preset>]\n\n' +
            `<preset>:\n${presetList}`
        );

        process.exit(0);
    }

    let [targetDirArg, presetArg] = args;
    let preset: string | null = null;
    let presetDir: string | null = null;

    if (presetArg) {
        if (presetArg.startsWith('--')) {
            preset = presetArg.slice(2);

            if (!presets.includes(preset))
                preset = null;
        }

        if (!preset)
            presetDir = presetArg;
    }

    if (!presetDir)
        presetDir = join(ownDir, 'presets', preset ?? defaultPreset);

    try {
        await access(presetDir);
    }
    catch {
        console.error(`Preset location not found:\n${presetDir}`);
        process.exit(1);
    }

    return {
        ownDir,
        targetDir: targetDirArg || process.cwd(),
        presetDir,
        preset,
    };
}
