import { GeneratorStep } from '../step';
import { fromRoot, fromSource } from '../fs';
import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function readAllCssFiles(stylesDir: string, cssFileNames: string[]) {
  return await Promise.all(cssFileNames.map(fileName => join(stylesDir, fileName)).map(path => readFile(path, 'utf8')));
}

async function writeOutput(result: string) {
  const resultPath = fromRoot('dist/styles.css');
  await writeFile(resultPath, result)
}

export const combineStyles: GeneratorStep = async () => {
  const stylesDir = fromSource('styles');
  const cssFileNames = await readdir(stylesDir)
  const cssFiles = await readAllCssFiles(stylesDir, cssFileNames)
  const result = cssFiles.join('\n');

  await writeOutput(result);
};
