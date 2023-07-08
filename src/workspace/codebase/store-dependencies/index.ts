export default (codebase: CodebaseType, dependencyKeys: string[]) => {
  const dependencies: Map<string, string> = new Map();
  dependencyKeys.forEach((key: string) => {
    if (codebase.package[key]) {
      Object.keys(codebase.package[key]).forEach((name: string) => dependencies.set(name, name));
    }
  });
  return [...dependencies.keys()];
};
