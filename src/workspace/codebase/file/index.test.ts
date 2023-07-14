import Codebase from '..';

const str = JSON.stringify;

describe('FileContainer', () => {
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
    const filesContainer = Object.values(codebase.files);
    const file = filesContainer[0];

    expect(file.pathname).toBe('/project/path1');
    expect(file.fullPath).toBe('/home/projects/project/path1');
    file.parse();
    expect(file.simple).toBe(false);
    expect(str(file.codeToAST())).toBe(str({}));
    expect(file.astToCode()).toBe('');
    expect(file.print()).toBe('');
    file.updateCode();
    expect(file.code).toBe('');
    const newFile = file.spawn({ pathname: '/home/projects/project/path4', ast: {}, import: '' });
    expect(newFile.pathname).toBe('/project/path4');
    expect(newFile.fullPath).toBe('/home/projects/project/path4');
  }, 7000);
});
