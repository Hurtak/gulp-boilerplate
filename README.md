# Gulp Boilerplate

all you need for development and compilation of simple frontend application

## Features

- starts [local server](https://www.browsersync.io/) with __automatic page reloads__
- 2 modes
	- faster dev mode with watching for changed files
	- distribution mode with minification (css, js, html) and cache busting by changing filenames (more in description below)

### Scripts

- when files change incrementally rebuild and reload page
- write your __javascript in ES6, modules (ES6 imports/exports) supported__
- [sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
- [minification](https://github.com/mishoo/UglifyJS2) (only in dist mode)
- cache busting by appending hash of the file content to the filename (styles.css → styles-a2c27fc283.css)

### Styles

- when files change, __inject new styles into the page without reload__
- [less](https://github.com/less/less.js) as preprocessor (can easily be replace with [SASS](https://github.com/sass) or anything else)
- [autoprefixer](https://github.com/postcss/autoprefixer)
- [sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
- [minification](https://github.com/jakubpawlowicz/clean-css) (only in dist mode)
- cache busting by appending hash of the file content to the filename (app.js → app-3bb897e475.js)

### HTML

- watch for changes and automatically reload page
- [minify html](https://github.com/kangax/html-minifier)

## How to use

- install [node.js](https://nodejs.org/en/) and npm (bundled with node.js)
- see simple example app inside `./app` directory
- files are compiled into `./dist` directory from with they are also server by development web server

```
git clone https://github.com/Hurtak/gulp-boilerplate.git
cd gulp-boilerplate
npm install gulp -g
npm install
gulp
```

### Tasks

- `gulp` (alias for `gulp dev`) starts development mode
	- starts server at `http://localhost:8080`
	- watches for file changes
	- skips minification of files and replacing of filenames (app.js → app-3bb897e475.js)

- `gulp dist` starts distribution mode
	- starts server at `http://localhost:8080`
	- no watches for file changes
	- minifies resources and appends hash to their filenames

## TODO

- live reload for dist task
- handle rev transformation (adding hash of file content to the file name) without creating/reading file
- task for images?
- incremental builds also for css?
