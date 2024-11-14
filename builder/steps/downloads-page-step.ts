import { promises as fs } from 'fs';
import { GeneratorStep } from '../step';
import { renderAsync } from './render-template-step';
import { fromRoot } from '../fs';
import { Page } from '../page';

export const generateDownloads: GeneratorStep = async () => {
  const res = await renderAsync('templates/downloads.html', {
    page: Page.Downloads,
  });
  await fs.writeFile(fromRoot(`dist/downloads.html`), res, 'utf8');
}
