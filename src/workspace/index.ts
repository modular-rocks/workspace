import FileContainer from './file';
import runPipeline from './pipeline';

export default class Workspace {
  opts: Options;

  constructor(opts: Options) {
    this.opts = opts;
  }

  async pipeline(files: FileContainer[], pipeline: Function[] | undefined, opts: Options) {
    return runPipeline(files, pipeline, opts, this);
  }
}
