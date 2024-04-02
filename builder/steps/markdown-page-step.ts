import {promises as fs} from 'fs';
import {GeneratorStep} from '../step';
import {renderAsync} from './render-template-step';
import {fromRoot, fromSource} from '../fs';
import {slugify} from '../slugify';
import {read} from 'gray-matter';
import {extname, relative} from 'path';
import {MarkdownFile} from "../contracts/markdown-file";

export const generateMarkdownPages: GeneratorStep = async () => {
    const pageFiles = await getPages();
    const pages = pageFiles
        .map(file => {
            const path = fromSource(file);
            const frontMatter = read(path);

            const fileName = relative(fromSource('pages'), path);
            const filenameWithoutExtension = fileName.substring(0, fileName.length - extname(path).length);

            return {
                ...frontMatter,
                url: `/${filenameWithoutExtension}`
            }
        });

    await Promise.all(
        pages.map(renderPage)
    );
}

async function renderPage(file: MarkdownFile) {
    const res = await renderAsync('templates/page.html', {
        meta: file.data,
        text: file.content,
    });
    await fs.writeFile(fromRoot(`dist/${slugify(file.url)}.html`), res, 'utf8');
}

async function getPages(root = 'pages'): Promise<string[]> {
    const pages: string[] = [];
    const pageFiles = await fs.readdir(fromSource(root), {withFileTypes: true});
    for (const file of pageFiles) {
        if (file.isDirectory()) {
            const subPages = await getPages(`${root}/${file.name}`);
            pages.push(...subPages);
        }
        if (file.isFile() && file.name.endsWith('.md')) {
            pages.push(`${root}/${file.name}`);
        }
    }

    return pages;
}
