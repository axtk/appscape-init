export function toDepList(depMap: Record<string, string> | undefined): string[] {
    if (!depMap)
        return [];

    return Object.entries(depMap)
        .map(([name, version]) => {
            if (version === '' || version === '*')
                return name;

            if (/^\d+/.test(version) && !/\s/.test(version))
                return `${name}@${version}`;

            return `${name}@"${version}"`;
        });
}
