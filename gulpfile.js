const argv = require('yargs').argv;
const gulp = require('gulp')
const shell = require('gulp-shell')
const validator = require('gulp-html')

gulp.task('homepage', () => {
	return gulp.src('index.html')
		.pipe(validator());
});

gulp.task('csass', () => {
	console.log('================================');
	console.log('Compiling SASS assets using ruby');
	console.log('================================');
	return gulp.src('*.js', {
			read: false
		})
		.pipe(shell([
			'sass css/custom.scss css/custom.css && ' +
			'sass css/media.scss css/media.css'
		]));
});