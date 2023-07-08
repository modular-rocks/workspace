# About the pipeline

A `Workspace` is designed to be highly configurable, allowing you to extend the `Workspace`, `Codebase` or `FileContainer` classes, allowing you to build different types of projects/products on top.

One of the features that makes this easy is the pipeline, consisting of an array of blocking functions that are enumerated and invoked in order. None of the functions will start until the previous has finished, and each function will be invoked through each `FileContainer` in the `Codebase`. Furthermore if a function is asyncronous and contains asyncronous features, like `await`, the pipeline will wait for the asyncronous to resolve before moving to the next function.

This is important for pipelines that need to access APIs before moving onto the next task. For example, the `SlimFast` pipeline works as follows:

1. Extract `AST NodePaths` and store them inside each `FileContainer`.
2. Name each newly extract `AST NodePath`. This may involve using an API which will require asyncronous calls.
3. Once extracted and named, we finally wrap the `AST NodePaths` into `AST Programs` and then store the files.

If we were to move onto step 3 before step 2 is complete, then many `AST NodePaths` would not yet be named.

By defining a pipeline of functions in the configuration, we also have the freedom to add another step anywhere in the pipeline simply by changing the configuration.