# PKG

Utils for creating, building and testing NPM packages

## Usage

Add the following to your `package.json`.

```
{
  "srcPath": "lib",
  "buildPath": "dist",
  "testsPath": "test",
  "scripts": {
    "build": "pkg-build",
    "prepublish": "pkg-build",
    "test": "pkg-test",
    "coverage": "pkg-coverage",
    "lint": "pkg-lint",
    "postpublish": "pkg-update-parents"
  },
  "devDependencies": {
    "@stayradiated/pkg": "0.0.1"
  },
  "babel": {
    "presets": [
      "stayradiated"
    ]
  }
}
```

## Commands

### pkg-build

### pkg-build-css

### pkg-clean

### pkg-coverage

### pkg-lint

### pkg-test

### pkg-update-parents
