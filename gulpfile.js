const gulp = require('gulp')
const validator = require('gulp-html')

gulp.task('html-check', () => {
  return gulp.src('index.html')
    .pipe(validator());
    // .pipe(gulp.dest('')); // default destination instead
});
