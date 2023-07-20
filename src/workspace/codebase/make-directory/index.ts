import { basename, dirname, posix } from 'path';

export default (codebase: CodebaseType, file: FileContainerType) => {
  const filename = basename(file.pathname);

  const filenamePieces = filename.split('.');
  const fileBaseName = filenamePieces[0];

  if (fileBaseName === 'index') {
    return file.pathname;
  }

  const directory = dirname(file.pathname);
  const newExtension = filenamePieces.slice(1).join('.');
  const newSrc = posix.join(directory, fileBaseName, `index.${newExtension}`);
  codebase.files[newSrc] = codebase.files[file.pathname];
  delete codebase.files[file.pathname];
  file.pathname = newSrc;

  return newSrc;
};
