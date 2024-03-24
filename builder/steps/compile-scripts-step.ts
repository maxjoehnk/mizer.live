import * as ts from 'typescript';
import { GeneratorStep } from '../step';
import { fromRoot, fromSource } from '../fs';

const jsFiles: string[] = [
]

export const compileScripts: GeneratorStep = () => Promise.all(compileTypescriptFiles());

function compileTypescriptFiles(): Promise<void>[] {
  return jsFiles.map(compileTypescript);
}

async function compileTypescript(file: string): Promise<void> {
  const sourceFile = fromSource(`${file}.ts`);
  const program = ts.createProgram([sourceFile], {

    outFile: fromRoot(`dist/${file}.js`),
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ES2020,
  })
  program.emit();
}
