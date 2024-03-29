import { promises as fs } from 'fs';
import { rimraf } from 'rimraf';
import { fromRoot } from './fs';

const cleanDist = () => rimraf(fromRoot('dist'));

const createDistDir = (path: string) => fs.mkdir(fromRoot(`dist/${path}`), { recursive: true });

export async function createDist() {
  await fs.mkdir(fromRoot('dist'), { recursive: true });
  await cleanDist();
  await Promise.all([
    createDistDir('styles'),
  ])
}
