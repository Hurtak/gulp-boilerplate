'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');

var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');

// Tasks

gulp.task('default', () => {
	runSequence(
		['del'],
		['scripts', 'html'],
		['scripts:watch', 'html:watch', 'browser-sync']
	);
});

gulp.task('scripts', () => buildScript('./app/scripts/app.js', './dist/scripts/', false));
gulp.task('scripts:watch', () => buildScript('./app/scripts/app.js', './dist/scripts/', true));

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
		port: 8080
	});
});

gulp.task('del', cb => rimraf('./dist', cb));

function buildScript(entry, dest, watch) {
	var props = {
		entries: [entry],
		debug: true,
		transform: [babelify.configure({stage: 0})]
	};

	// watchify() if watch requested, otherwise run browserify() once
	var bundler = watch ? watchify(browserify(props)) : browserify(props);

	function rebundle() {
		var stream = bundler.bundle();
		return stream
			.on('error', function (err) {
				console.error(`Error: ${ err.message }`);
				this.emit('end');
			})
			.pipe(source(entry))
			.pipe(buffer())
			.pipe($.sourcemaps.init({loadMaps: true}))
			// .pipe($.uglify())
			.pipe($.sourcemaps.write('.'))
			.pipe($.flatten())
			.pipe(gulp.dest(dest))
			.pipe(browserSync.reload({stream: true}));
	}

	// listen for an update and run rebundle
	bundler.on('update', () => {
		rebundle();
		$.util.log('Rebundle...');
	});

	// run it once the first time buildScript is called
	return rebundle();
}
