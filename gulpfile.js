const argv = require('yargs').argv;
const gulp = require('gulp')
const shell = require('gulp-shell')
const validator = require('gulp-html')

gulp.task('html-check', () => {
  return gulp.src('index.html')
    .pipe(validator());
    // .pipe(gulp.dest('')); // default destination instead
});

// TODO: Magic compile
gulp.task('compile-sass', () => {
  console.log('This requires sass gem!');
  return gulp.src('*.js', {read: false})
  .pipe(shell([
    'sass '+argv.i+' '+argv.o
  ]));
});
