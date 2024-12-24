import {sep} from 'node:path';

let maxDepth = 3;

export function truncatePath(path: string) {
    let components = path.split(sep);

    if (components.length <= maxDepth)
        return path;

    return `<...>${sep}${components.slice(-maxDepth).join(sep)}`;
}
