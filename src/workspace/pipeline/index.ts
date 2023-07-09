function wait(func: Function, file: FileContainerType, state: State, opts: WorkspaceOpts, workspace: WorkspaceType) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await func(file, state, opts, workspace);
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

const invoke = async (
  func: Function,
  files: FileContainerType[],
  state: State,
  opts: WorkspaceOpts,
  workspace: WorkspaceType
) => {
  const promises = files.map((file: FileContainerType) => wait(func, file, state, opts, workspace));
  return Promise.all(promises);
};

const promise = async (
  files: FileContainerType[],
  pipeline: Function[],
  opts: WorkspaceOpts,
  workspace: WorkspaceType,
  resolve: Function
) => {
  const state: State = {};

  for (const func of pipeline) {
    const isNotFunction = typeof func === 'function';
    if (isNotFunction) {
      await invoke(func, files, state, opts, workspace);
    }
  }
  resolve();
};

export default async (
  files: FileContainerType[],
  pipeline: Function[] | undefined,
  opts: WorkspaceOpts,
  workspace: WorkspaceType
) => {
  if (!pipeline) return false;

  return new Promise((resolve) => {
    promise(files, pipeline, opts, workspace, resolve);
  });
};
