export default (localObject: RandomObject, foreignObject: RandomObject) => {
  Object.keys(foreignObject).forEach((path: string) => {
    localObject[path] = foreignObject[path];
  });
};
