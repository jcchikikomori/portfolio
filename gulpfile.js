const gulp = require('gulp')
const shell = require('gulp-shell')

gulp.task('tidy', () => {
	return new Promise(function(resolve, reject) {
		console.log("HTTP Server Started");
		resolve();
	});
})