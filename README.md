# Gulp Boilerplate

all you need for development and compilation of simple frontend application

## Features

- starts [local server](https://www.browsersync.io/) with __automatic page reloads__
- 2 modes
	- __faster dev__ mode with watching for changed files
	- __distribution mode__ with minification (css, js, html) and cache busting by appending hash to filename

### Scripts

- when files change incrementally rebuild and reload page
- write your __javascript in ES6, modules (ES6 imports/exports) supported__
- [sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
- [minification](https://github.com/mishoo/UglifyJS2) (only in dist mode)
- cache busting by appending hash of the file content to the filename, styles.css → styles-a2c27fc283.css (only in dist mode)

### Styles

- when files change, __inject new styles into the page without reload__
- [less](https://github.com/less/less.js) as preprocessor (can easily be replace with [sass](https://github.com/sass) or anything else)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
- [minification](https://github.com/jakubpawlowicz/clean-css) (only in dist mode)
- cache busting by appending hash of the file content to the filename, app.js → app-3bb897e475.js (only in dist mode)

### HTML

- watch for changes and automatically reload page
- [minify html](https://github.com/kangax/html-minifier)

## How to use

### Installation

- install [node.js](https://nodejs.org/en/) and npm (bundled with node.js)
- install dependencies by running `npm install gulp -g && npm install` or `make install`

### Application structure

- see simple example app inside `./app` directory
- files are compiled into `./dist` directory from which they are also served

### Gulp tasks

- `gulp` (alias for `gulp dev`) starts development mode
	- starts server at `http://localhost:8080`
	- watches for file changes
	- skips minification of files and replacing of filenames (app.js → app-3bb897e475.js)

- `gulp dist` starts distribution mode
	- starts server at `http://localhost:8080`
	- no watches for file changes
	- minifies resources and appends hash to their filenames

## TODO

- task for tests
- live reload for dist task
- handle rev transformation (adding hash of file content to the file name) without creating/reading json file from FS
- task for images?
- incremental builds also for css?
