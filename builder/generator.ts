import { compileScripts } from './steps/compile-scripts-step';
import { GeneratorStep } from './step';
import { copyAssets } from './steps/copy-assets-step';
import { createDist } from './dist-setup';
import { generateHomepage } from './steps/homepage-step';
import { combineStyles } from './steps/combine-styles-step';
import {generateMarkdownPages} from "./steps/markdown-page-step";

const steps: GeneratorStep[] = [
  compileScripts,
  combineStyles,
  generateHomepage,
  generateMarkdownPages,
  copyAssets,
]

export async function generate() {
  console.log('Building project...');
  const time = await stopwatch(async () => {
    const [_, projects] = await Promise.all([
      createDist(),
    ])
    await Promise.all(
      steps.map(step => step()),
    );
  });
  console.log(`Done in ${time.toFixed(2)}s`);
}

async function stopwatch(run: () => any): Promise<number> {
  const before = performance.now()
  await run()
  const after = performance.now();
  const duration = (after - before) / 1000;

  return duration;
}
