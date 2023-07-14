import { dirname } from 'path';

interface ProvisionalFile {
  pathname: string;
  ast: any;
  import: any;
}

export default class FileContainer {
  pathname: string;

  fullPath: string;

  type?: string;

  code: string;

  simple: Boolean;

  hasParent: Boolean;

  codebase: CodebaseType;

  store: FileStore;

  ast?: any;

  constructor(path: string, code: string, codebase: CodebaseType) {
    this.codebase = codebase;
    this.pathname = codebase.replaceRoot(path);
    this.fullPath = path;
    this.code = code;
    this.simple = false;
    this.store = {};

    const parentPath = dirname(this.pathname);
    this.hasParent = !['/', '.'].includes(parentPath);
  }

  tooSimple(): Boolean {
    return false;
  }

  codeToAST() {
    return {};
  }

  astToCode(ast: any) {
    return '';
  }

  parse() {
    if (this.ast && this.simple) return;
    this.ast = this.codeToAST();
    this.simple = this.tooSimple();
  }

  print(ast?: any) {
    if (ast) {
      return this.astToCode(ast);
    }
    if (!this.ast) this.parse();
    return this.astToCode(this.ast);
  }

  spawn(file: ProvisionalFile) {
    return new FileContainer(file.pathname, this.print(file.ast), this.codebase);
  }

  addImport() {}

  updateCode() {
    this.code = this.print();
  }

  save() {
    this.codebase.saveFile(this.pathname, this.code);
  }
}
