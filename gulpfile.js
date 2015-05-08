var gulp 				 = require('gulp'),
		jade 				 = require('gulp-jade'),
		sass 				 = require('gulp-sass')
		connect			 = require('gulp-connect'),
		watch 			 = require('gulp-watch'),
		clean 			 = require('gulp-clean'),
		autoprefixer = require('gulp-autoprefixer');

gulp.task('clean', function() {
	return gulp.src('public', { read: false })
		.pipe(clean({ force: true }))
});

gulp.task('sass', function() {
	return gulp.src('dev/sass/styles.sass')
		.pipe(sass({
			errLogToConsole: true,
			indentedSyntax: true,
		}))
		.pipe(autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
		}))
		.pipe(gulp.dest('public/css/'))
		.pipe(connect.reload());
});

gulp.task('jade', function() {
	return gulp.src('dev/jade/pages/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('public/'))
		.pipe(connect.reload());
});

gulp.task('img', function() {
	return gulp.src('dev/img/**/*', { base: 'dev/img' })
		.pipe(watch('dev/img', { base: 'dev/img' }))
		.pipe(gulp.dest('public/img/'))
		.pipe(connect.reload());
});

gulp.task('connect', function() {
	connect.server({
		root: 'public',
		livereload: true,
		port: 8000
	});
});

gulp.task('watch', function () {
  gulp.watch(['./dev/jade/**/*.jade'], ['jade']);
  gulp.watch(['./dev/sass/**/*.sass'], ['sass']);
  gulp.watch(['./dev/img/**/*'], ['img']);
});

gulp.task('default', ['sass', 'jade', 'img', 'connect', 'watch']);