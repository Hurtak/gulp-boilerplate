'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const browserSync = require('browser-sync');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');

gulp.task('default', () => {
	runSequence(
		['del'],
		['scripts', 'scripts:watch', 'html', 'html:watch'],
		['browser-sync']
	);
});

gulp.task('scripts', () => scripts('./app/scripts/app.js', './dist/scripts/', false));
gulp.task('scripts:watch', () => scripts('./app/scripts/app.js', './dist/scripts/', true));

gulp.task('html', () =>
	gulp.src('./app/index.html')
		.pipe($.htmlmin({
			removeComments: true,
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('./dist'))
);

gulp.task('html:watch', () => {
	gulp.watch('./app/index.html', ['html', browserSync.reload]);
});

gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: './dist'
		},
		ghostMode: false,
		port: 8080,
		open: false
	});
});

gulp.task('del', cb => rimraf('./dist', cb));

function scripts(entry, dest, watch) {
	const config = {
		entries: entry,
		debug: true,
		transform: [babelify.configure({presets: ['es2015']})]
	};

	const bundler = watch ? watchify(browserify(config)) : browserify(config);
	let elapsedTime = Date.now();

	function rebundle() {
		const stream = bundler.bundle();
		return stream
			.on('error', function (err) {
				$.util.log($.util.colors.red(`Error: ${ err.message }`));
				// keeps gulp from hanging when error happens
				this.emit('end');
			})
			.pipe(source(entry))
			.pipe(buffer())
			.pipe($.sourcemaps.init({loadMaps: true}))
			// .pipe($.uglify())
			.pipe($.flatten())
			.pipe($.sourcemaps.write('.'))
			.pipe(gulp.dest(dest))
			.on('end', () => { $.util.log(`Rebundle ${ Date.now() - elapsedTime } ms`); })
			.pipe(browserSync.reload({stream: true}));
	}

	// listen for an update and run rebundle
	bundler.on('update', () => {
		elapsedTime = Date.now();
		rebundle();
	});

	return watch ? bundler.bundle() : rebundle();
}
