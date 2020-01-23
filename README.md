![PKG](./PKG.png)

> My scripts for writing typescript code.

## Installation

```
npm install --save-dev @stayradiated/pkg
```

## Recommended Scripts

Copy the following into your `package.json`.

```json
"scripts": {
  "build": "pkg-build",
  "lint": "pkg-lint",
  "tidy": "pkg-tidy",
  "test": "pkg-test",
  "precommit": "pkg-precommit"
}
```

### Type declarations

If you need to use a 3rd party library that doesn't have typescript support,
you can provide your own type declarations.

There are some strict rules you need to follow for this to work:

1. You must only mock one dependency per file.
1. You must place the file inside the `./src/types/` folder.
2. The filename must be the same as the dependency name.
3. The extension must be `.d.ts`.

For example, if you are providing types for `file-exists`, the types must be
saved in `./src/types/file-exists.d.ts.`

### Providing Typescript types for a project written in JS

If you are manually adding types for a non-typescript project, you must keep
your types in the root of your project, in a file named `types.d.ts`.

`@stayradiated/package` will not use the typescript compiler if your package.json
contains the value: `"types": "types.d.ts"`.

## Lifecycle Test Helpers

AVA does not support "before all" or "after all" functions, because it runs
everything in parallel.

Package has got your back though. If you need to setup/teardown a database,
then this is for you.

Please note, that if you run AVA in watch mode, the "after all" function will
not be called until you exit AVA.

### Before All

Create a file called `testHelpers/beforeAll.js` in the root of your project,
and it will be executed before the tests begin.

### After All

Create a file called `testHelpers/afterAll.js` in the root of your project,
and it will be executed after the tests finish.

It will be called regardless of whether the tests passed or failed.

## Different Folder Structure

### srcPath

If your code is kept in a folder that isn't `src` then you can change the path
by adding the following to your `package.json`

```
"srcPath": "lib",
```

### distPath

Would you like your compiled code to be in a folder that isn't named `dist`?

```
"distPath": "public"
```

### testsPath

Tests must be defined inside the `srcPath`, and by default match any files that
end in `.spec.js`.

```
"testsPath": "**/*.test.js",
```
