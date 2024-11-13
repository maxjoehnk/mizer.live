import { Environment, FileSystemLoader } from 'nunjucks';
import { fromRoot, fromSource } from '../fs';
import markdownFilter from '../template-filters/markdown';
import { Page } from '../page';
import { slugify } from '../slugify';

export const templateEnvironment = new Environment(new FileSystemLoader(fromRoot('src'), { noCache: true }), { autoescape: false })
templateEnvironment.addFilter('markdown', markdownFilter)
templateEnvironment.addFilter('slug', slugify)

function enhanceContext(context = {}) {
  return {
    ...context, pages: {
      [Page.Home]: '/',
    }
  };
}

export const renderAsync = (file: string, context?): Promise<string> => new Promise(((resolve, reject) => {
  templateEnvironment.render(fromSource(file), enhanceContext(context), (err, res) => {
    if (err) {
      return reject(err);
    }
    return resolve(res);
  });
}));
