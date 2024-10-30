export function getJSONTabSize(s: string) {
    return s.match(/^(\s*)"name":/m)?.[1]?.length ?? 2;
}
