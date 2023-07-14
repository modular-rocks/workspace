import { basename, dirname } from 'path';
import FileContainer from './file';

import { fromJson, fromFile, toFile, saveToJSON, saveFile } from './save';
import copy from './copy';
import storeDependencies from './store-dependencies';
import makeDirectory from './make-directory';

export default class Codebase {
  src: string;

  extensions: string[];

  ignoredFiles: string[];

  ignoredImports: string[];

  files: FilesContainer;

  rootName: string;

  srcWithoutRoot: string;

  package: PackageContents;

  dependencies: string[];

  opts: CodebaseOpts;

  constructor(opts: CodebaseOpts) {
    this.src = opts.src;
    this.extensions = opts.extensions;
    this.ignoredFiles = opts.ignoredFiles;
    this.ignoredImports = opts.ignoredImports;
    this.opts = opts;

    this.rootName = basename(this.src);
    this.srcWithoutRoot = dirname(this.src);

    this.files = this.storeFiles(opts.files);

    this.dependencies = [];
    this.package = opts.packageContents || {};
    this.storeDependencies();
  }

  replaceRoot(path: string) {
    return path.replace(this.srcWithoutRoot, '');
  }

  storeFiles(files: [string, string][]) {
    this.files = {};
    files.map((record: [string, string]) => this.storeFile(record));
    return this.files;
  }

  extractFiles(): FileContainerType[] {
    return Object.values(this.files);
  }

  newFile(path: string, code: string): FileContainer {
    return new FileContainer(path, code, this);
  }

  storeFile(record: [string, string]) {
    const [path, code] = record;
    const file = this.newFile(path, code);
    this.files[file.pathname] = file;
  }

  removeFile(path: string) {
    delete this.files[path];
  }

  deepCopy(version: Codebase) {
    this.files = {};
    copy(this.files, version.files);
  }

  dependencyKeys(): string[] {
    return [];
  }

  storeDependencies() {
    this.dependencies = storeDependencies(this, this.dependencyKeys());
  }

  makeDirectory(file: FileContainer) {
    return makeDirectory(this, file);
  }

  addFile(file: FileContainer) {
    this.files[file.pathname] = file;
  }

  updateFiles(files: FileContainer[]) {
    files.forEach(this.addFile.bind(this));
  }

  saveFile(pathname: string, code: string) {
    saveFile(pathname, code);
  }

  saveToJSON(pathname: string, data: RandomObject) {
    saveToJSON(pathname, data);
  }

  fromJson(data: RandomObject) {
    fromJson(data);
  }

  fromFile(path: string) {
    fromFile(path, this);
  }

  toFiles() {
    this.extractFiles().map(toFile);
  }

  save() {
    this.extractFiles().map((file: FileContainerType) => file.save());
  }
}
