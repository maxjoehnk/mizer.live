import { join } from 'path';

export const ROOT = join(__dirname, '..');

export const fromRoot = (path: string) => join(ROOT, path);
export const fromSource = (path: string) => join(ROOT, 'src', path);
