# A Workspace for working with virtual codebases

## Installation

`npm install @modular-rocks/workspace`

or 

`yarn add @modular-rocks/workspace` 


## Usage

A Workspace can contain multiple Codebases, a Codebase will contain FileContainers. It is designed to be highly configurable, allowing you to extend the Workspace, Codebase or FileContainer classes, allowing you to build anything you want on top.

Each Workspace and Codebase accepts an `Options` argument containing configuration options. 

| Option | Description | Type |  Example | 
| -------- | -------- | -------- | -------- |
| pipeline | Array of functions | Function[] | [functionA, functionB] | 
| files | Array of arrays consisting of pathname and code | [pathname:string, code:string][] | [['/path', 'hello world']] |
| src | source of the project | string | '/path/to/project' | 
| extensions | Array of extensions to filter the files by | string[] | ['ts', 'js'] | 
| ignoredFiles | Array of files to filter the files by | string[] | ['.d.ts'] | 
| ignoredImports | Array of import statements | string[] | ['$GlobalVariable'] | 
| packageContents | JSON Object like in `package.json` | Object | ['$GlobalVariable'] | 

    const opts: Options = {
      pipeline, 
      files, 
      src: '/', 
      extensions: [], 
      ignoredFiles: [], 
      ignoredImports: [],
      packageContents: {}
    }

A FileContainer accepts 3 arguments: `pathname:string`, `code:string`, `codebase:Codebase`.

The pipeline is described in detail in the readme of the pipeline folder.

## Framework specific versions

- [workspace-node](https://github.com/modular-rocks/workspace-node)

## Examples

Examples coming soon...

## License

Apache 2.0