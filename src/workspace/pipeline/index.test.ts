import Codebase from '../codebase';

import runPipeline from '.';
import Workspace from '..';

type OutPutIteration = [number, number];

const normalFunction = (i: number, time: number, output: OutPutIteration[]) => {
  return () => {
    const result: OutPutIteration = [i, time];
    output.push(result);
    return result;
  };
};

const asyncFunction = (i: number, time: number, output: OutPutIteration[]) => {
  return async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        const result: OutPutIteration = [i, time];
        output.push(result);
        resolve(result);
      }, time);
    });
  };
};

describe('Pipeline', () => {
  test('Is invoked in order', async () => {
    const output: OutPutIteration[] = [];

    const pipeline = [
      asyncFunction(1, 500, output),
      asyncFunction(2, 20, output),
      normalFunction(3, 600, output),
      normalFunction(4, 30, output),
      asyncFunction(5, 200, output),
      asyncFunction(6, 800, output),
    ];

    const files: [string, string][] = [1, 2, 3].map((x: number) => [`/path${x}`, '']);
    const opts: WorkspaceOpts = {
      pipeline,
      files,
      src: '/',
      extensions: [],
      ignoredFiles: [],
      ignoredImports: [],
      packageContents: {},
    };

    const codebaseOpts: CodebaseOpts = {
      pipeline,
      files,
      src: '/',
      extensions: [],
      ignoredFiles: [],
      ignoredImports: [],
      packageContents: {},
    };

    const workspace = new Workspace(opts);
    const codebase = new Codebase(codebaseOpts);
    const filesContainer = Object.values(codebase.files);

    await runPipeline(filesContainer, pipeline, opts, workspace);
    const result = [
      [1, 500],
      [1, 500],
      [1, 500],
      [2, 20],
      [2, 20],
      [2, 20],
      [3, 600],
      [3, 600],
      [3, 600],
      [4, 30],
      [4, 30],
      [4, 30],
      [5, 200],
      [5, 200],
      [5, 200],
      [6, 800],
      [6, 800],
      [6, 800],
    ];
    expect(JSON.stringify(output)).toBe(JSON.stringify(result));
  }, 7000);
});
