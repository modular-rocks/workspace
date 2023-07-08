declare module '@modular-rocks/workspace';
interface RandomObject extends Record<string, any> {}
interface FilesContainer extends Record<string, FileContainer> {}

interface Options {
  pipeline?: Function[];
  src: string;
  files: any[][];
  extensions: string[];
  ignoredFiles: string[];
  packageContents: RandomObject;
  ignoredImports: string[];
  custom?: Custom;
}

interface WorkspaceType {
  opts: Options;
}

interface CodebaseType {
  src: string;
  extensions: string[];
  ignoredFiles: string[];
  ignoredImports: string[];
  files: FilesContainer;
  rootName: string;
  srcWithoutRoot: string;
  package: PackageContents;
  dependencies: string[];
  opts: Options;
  replaceRoot: Function;
  saveFile: Function;
  fromJson: Function;
}

interface FileContainerType {
  pathname: string;
  fullPath: string;
  type?: string;
  code: string;
  simple: Boolean;
  hasParent: Boolean;
  codebase: CodebaseType;
  store: FileStore;
  ast?: any;
}

interface Custom {
  [propter: string]: any;
}

interface State {
  [property: string]: string;
}

type Extract = [NodePath, RandomObject];

interface FileStore {
  [property: string]: any;
}

declare module 'array-unique' {
  function unique(array: any[]): any[];

  export = unique;
}

// Can take any shape, generately has to be an Object like Node packages
// Ports to any other languages can be formatted
interface PackageContents {
  [property: string]: any;
}
