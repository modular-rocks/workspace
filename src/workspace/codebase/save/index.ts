import fs from 'fs';
import { dirname } from 'path';

const createFile = (pathname: string, contents: string) => {
  fs.createWriteStream(pathname).write(contents);
};

const createDir = (pathname: string, contents: string) => {
  const folder = dirname(pathname);
  fs.mkdir(folder, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    createFile(pathname, contents);
  });
};

export const toJson = (data: RandomObject) => {
  return JSON.stringify(data);
};

export const saveFile = (pathname: string, code: string) => {
  createDir(pathname, code);
};

export const saveToJSON = (pathname: string, data: RandomObject) => {
  createDir(pathname, toJson(data));
};

export const fromFile = (pathname: string, codebase: CodebaseType) => {
  fs.readFile(pathname, { encoding: 'utf-8' }, function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) {
      console.error(err);
      return;
    }
    try {
      const jsonData: Record<string, unknown> = JSON.parse(data);
      codebase.fromJson(jsonData);
    } catch (parseError) {
      console.error('Could not parse data:', parseError);
    }
  });
};

export const toFile = (file: FileContainerType) => {
  const { pathname: path, code } = file;
  createDir(path, code);
};

export const fromJson = (data: RandomObject) => {
  Object.keys(data).forEach((key: string) => {
    Object.defineProperty(this, key, {
      value: data[key],
      writable: true,
      enumerable: true,
      configurable: true,
    });
  });
};
