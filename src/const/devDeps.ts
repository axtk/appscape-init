import type {Preset} from '../types/Preset';

const commonDevDeps = [
    '@types/express',
    '@types/node',
    'appscape-build',
    'cross-env',
    'nodemon',
    'npm-run-all',
];

export const devDeps: Record<Preset, string[]> = {
    'blank': commonDevDeps,
    'files': commonDevDeps,
    'react-spa': [
        ...commonDevDeps,
        '@types/react',
        '@types/react-dom',
    ],
};
