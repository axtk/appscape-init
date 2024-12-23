import {access} from 'node:fs/promises';
import {join} from 'node:path';
import type {Config} from '../types/Config';
import {getPresets} from './getPresets';

export async function getConfig(): Promise<Config> {
    let [targetDirArg, presetArg] = process.argv.slice(2);
    let ownDir = join(__dirname, '..');

    let preset: string | null = null;
    let presetDir: string | null = null;

    if (presetArg) {
        if (presetArg.startsWith('--')) {
            let presets = await getPresets({ownDir});

            preset = presetArg.slice(2);

            if (!presets.includes(preset))
                preset = null;
        }

        if (!preset)
            presetDir = presetArg;
    }

    if (!presetDir)
        presetDir = join(ownDir, 'presets', preset ?? 'blank');

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
