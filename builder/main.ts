import { startDev } from './watcher';
import { generate } from './generator';

async function main() {
  if (process.argv.includes('--watch')) {
    console.log('Running in watch mode');
    await startDev()
  }else {
    await generate()
  }
}

main().catch(console.error)
