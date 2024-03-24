import { promises as fs } from 'fs';
import { GeneratorStep } from '../step';
import { renderAsync } from './render-template-step';
import { fromRoot, fromSource } from '../fs';
import { read } from 'gray-matter';
import { Page } from '../page';

export const generateHomepage: GeneratorStep = async () => {
  const markdownPath = fromSource('home.md')
  const frontMatter = await read(markdownPath)
  const res = await renderAsync('pages/home.html', {
    page: Page.Home,
    ...frontMatter.data,
  });
  await fs.writeFile(fromRoot(`dist/index.html`), res, 'utf8');
}
