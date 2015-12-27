# Gulp Boilerplate

all you need for develompent/compilation of simple frontend applications

## Features

### Scripts

- when files change incrementally rebuild and reload browser
- [sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
- [minify](https://github.com/mishoo/UglifyJS2) (only in dist mode)
- cache busting by appending of the file content to the filename (styles.css -> styles-a2c27fc283.css)

### Styles

- inject new styles into the page without page reload when files change
- [sourcemaps](https://github.com/floridoo/gulp-sourcemaps)
- [minify](https://github.com/jakubpawlowicz/clean-css) (only in dist mode)
- [autoprefix](https://github.com/postcss/autoprefixer)
- cache busting by appending of the file content to the filename (app.js -> app-3bb897e475.js)

### HTML

- watch for change and automatically reload browser
- cache busting by appending hash content of the file to the filename (app.js -> app-3bb897e475.js)
- minify html

## How to use

- install [node.js](https://nodejs.org/en/) and npm (bundled with node.js)

```
git clone https://github.com/Hurtak/gulp-boilerplate.git
cd gulp-boilerplate
npm install gulp -g
npm install
gulp
```

### Tasks

- `gulp` (alias for `gulp dev`) starts development mode
	- starts server at `localhost:8080`
	- watches for file changes
	- skips minification of files and replacing of filenames (app.js -> app-3bb897e475.js)

- `gulp dist` starts distribution mode
	- starts server at `localhost:8080`
	- no watches for file changes
	- minifies resources and appends hash to their filenames

## TODO

- bump version to 1.0.0 once done
- live reload for dist task
- handle rev transformation (adding hash of file content to the file name) without creating/reading file
- task for images?
