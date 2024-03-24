import { GeneratorStep } from '../step';
import { promises as fs } from 'fs';
import { join } from 'path';
import { fromRoot, fromSource } from '../fs';

export const copyAssets: GeneratorStep = async () => {
  await copyStaticFiles('assets');
}

async function copyStaticFiles(folder: string) {
  const path = fromSource(folder);
  const files = await fs.readdir(path, { withFileTypes: true })
  const target = fromRoot(join('dist', folder))
  await fs.mkdir(target, { recursive: true })
  for (const file of files) {
    if (file.isDirectory()) {
      await copyStaticFiles(join(folder, file.name))
    }else {
      await fs.copyFile(join(path, file.name), join(target, file.name))
    }
  }
}
