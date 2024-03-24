import { promises as fs } from 'fs';
import { promisify } from 'util';
import * as rimraf from 'rimraf';
import { fromRoot } from './fs';

const cleanDir = promisify(rimraf);
const cleanDist = () => cleanDir(fromRoot('dist'));

const createDistDir = (path: string) => fs.mkdir(fromRoot(`dist/${path}`), { recursive: true });

export async function createDist() {
  await fs.mkdir(fromRoot('dist'), { recursive: true });
  await cleanDist();
  await Promise.all([
    createDistDir('styles'),
  ])
}
