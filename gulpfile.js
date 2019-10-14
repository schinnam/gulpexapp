const gulp = require('gulp');
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const concat = require('gulp-concat')
const watch = require('gulp-watch')

/*

  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Point to folde to output
  gulp.watch - Watch files and folders for changes

*/


// Logs message
gulp.task('message', async function(){
  return console.log('Gulp is running...');
});

// Copy all html
gulp.task('copyHtml', async function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
});

// Optmize images
// exports.imageMin = () => (
//     gulp.src('src/images/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/images'))
// );

gulp.task('imageMin', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);


// Minify JS
gulp.task('minify', () =>
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

// Compile Sass
gulp.task('sass', () =>
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
);

// Scripts
gulp.task('scripts', () =>
    gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
);

gulp.task('default', gulp.parallel(['message', 'copyHtml', 'imageMin', 'scripts', 'sass']));

gulp.task('watch', function() {
    gulp.watch('src/js/*.js', gulp.parallel(['scripts']));
    gulp.watch('src/images/*', gulp.parallel(['imageMin']));
    gulp.watch('src/sass/*.scss', gulp.parallel(['sass']));
    gulp.watch('src/*.html', gulp.parallel(['copyHtml']));
  });


// gulp.task('default', async function(){
//   return console.log('Gulp is running...');
// });
