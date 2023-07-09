import Codebase from '.';

const str = JSON.stringify;

describe('Codebase', () => {
  test('Everything works as expected', async () => {
    const files: [string, string][] = [1, 2, 3].map((x: number) => [`/home/projects/project/path${x}`, '']);
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

    expect(codebase.src).toBe('/home/projects/project/');
    expect(codebase.rootName).toBe('project');
    expect(codebase.srcWithoutRoot).toBe('/home/projects');
    expect(str(codebase.extensions)).toBe(str([]));
    expect(str(codebase.ignoredFiles)).toBe(str([]));
    expect(str(codebase.ignoredImports)).toBe(str([]));
    expect(str(codebase.opts)).toBe(str(opts));
    expect(str(codebase.package)).toBe(str({}));
  }, 7000);
});
