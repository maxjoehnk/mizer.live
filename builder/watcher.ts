import { generate } from './generator';
import { subscribe } from '@parcel/watcher'
import * as express from 'express';
import { fromRoot } from './fs';

let building = false;

export async function startDev() {
  const app = express();
  app.use(express.static(fromRoot('dist'), { extensions: ['html'] }))
  await generate();
  await subscribe(fromRoot('src'), build);
  app.listen(5000, () => console.log('Listening on 0.0.0.0:5000'));
}

async function build(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  if (building) {
    return;
  }
  building = true;
  try {
    await generate();
  } finally {
    building = false
  }
}

