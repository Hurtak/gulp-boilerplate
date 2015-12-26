'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');

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
	var config = {
		entries: entry,
		debug: true,
		transform: [babelify.configure({presets: ['es2015']})]
	};

	var bundler = watch ? watchify(browserify(config)) : browserify(config);
	var elapsedTime = Date.now();

	function rebundle() {
		var stream = bundler.bundle();
		return stream
			.on('error', function (err) {
				$.util.log($.util.colors.red(`Error: ${ err.message }`));
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
