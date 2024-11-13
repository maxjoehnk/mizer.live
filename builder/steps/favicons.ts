import {GeneratorStep} from "../step";
import {fromRoot, fromSource} from "../fs";
import * as fs from "fs/promises";
import * as path from "path";
import favicons, {FaviconOptions} from 'favicons';

export const generateFavicons: GeneratorStep = async () => {
  const src = fromSource('assets/logo.svg');
  const dest = fromRoot('dist/favicons');

  const configuration: FaviconOptions = {
    path: '/favicons/',
    icons: {
      favicons: true,
      windows: true,
      appleIcon: true,
      android: false,
      appleStartup: false,
      yandex: false,
    }
  }
  const icons = await favicons(src, configuration);

  await fs.mkdir(dest, { recursive: true });
  await Promise.all(
    icons.images.map(
      async (image) =>
        await fs.writeFile(path.join(dest, image.name), image.contents),
    ),
  );
  await Promise.all(
    icons.files.map(
      async (file) =>
        await fs.writeFile(path.join(dest, file.name), file.contents),
    ),
  );

  return icons.html.join('\n');
}
