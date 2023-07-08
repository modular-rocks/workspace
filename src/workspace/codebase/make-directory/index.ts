import { basename, dirname, join } from 'path';

export default (codebase: CodebaseType, file: FileContainerType) => {
  const filename = basename(file.pathname);

  const filenamePieces = filename.split('.');
  const subfolder = filenamePieces[0];

  if (subfolder === 'index') {
    return file.pathname;
  }

  const directory = dirname(file.pathname);
  const newExtension = filenamePieces.slice(1).join('.');
  const newSrc = join(directory, subfolder, `index.${newExtension}`);
  codebase.files[newSrc] = codebase.files[file.pathname];
  delete codebase.files[file.pathname];
  file.pathname = newSrc;

  return newSrc;
};
