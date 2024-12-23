import type {Preset} from '../types/Preset';

const commonDeps = [
    'appscape',
    'express',
];

export const deps: Record<Preset, string[]> = {
    'blank': commonDeps,
    'files': commonDeps,
    'react-spa': [
        ...commonDeps,
        'react',
        'react-dom',
        'groundstate',
        'routescape',
        'isbot',
    ],
};
