import makeDirectory from '.';
import Codebase from '..';

describe('Make Directory', () => {
  test('Everything works', async () => {
    const files: [string, string][] = [1, 2, 3].map((x: number) => [`/home/projects/project/path${x}.ts`, '']);
    const pipeline: Function[] = [];

    const opts: CodebaseOpts = {
      pipeline,
      files,
      src: '/home/projects/project/',
      extensions: [],
      ignoredFiles: [],
      ignoredImports: [],
      packageContents: {},
    };

    const codebase = new Codebase(opts);
    const file = codebase.extractFiles()[0];
    const newSrc = makeDirectory(codebase, file);
    expect(newSrc).toBe('/project/path1/index.ts');
  });
});
