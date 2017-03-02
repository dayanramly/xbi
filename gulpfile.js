var gulp        = require('gulp'),
browserSync     = require('browser-sync'),
reload          = browserSync.reload,
sass            = require('gulp-sass'),
prettify = require('gulp-prettify'),
autoprefixer    = require('gulp-autoprefixer'),
uglify          = require('gulp-uglify'),
rename          = require('gulp-rename'),
imagemin        = require('gulp-imagemin'),
pngquant        = require('imagemin-pngquant'),
cssnano         = require('gulp-cssnano'),
livereload      = require('gulp-livereload'),
del             = require('del');

var OutputGlobal    = 'assets/global',
OutputLayout    = 'assets/layouts',
OutputPages     = 'assets/pages';

var ImageFiles = 'src/assets/global/img/**/*';
var OutputImageFiles = 'assets/global/img/';

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

// start webserver
gulp.task('server', function(done) {
  return browserSync({
    server: {
      baseDir: './'
  }
}, done);
});

// reload all Browsers
gulp.task('bs-reload', function() {
  browserSync.reload();
});

//*** SASS compiler task
gulp.task('sass', function () {
  // bootstrap compilation
  gulp.src('src/sass/bootstrap.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest( OutputGlobal + '/plugins/bootstrap/css/'));

  // select2 compilation using bootstrap variables
  gulp.src('src/assets/global/plugins/select2/sass/select2-bootstrap.min.scss').pipe(sass({outputStyle: 'compressed'})).pipe(gulp.dest(OutputGlobal + '/plugins/select2/css/'));

  // global theme stylesheet compilation
  gulp.src('src/sass/global/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputGlobal + '/css'));
  gulp.src('src/sass/pages/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest( OutputPages + '/css'));

  // theme layouts compilation
  gulp.src('src/sass/layouts/layout/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputLayout + '/layout/css'));
  gulp.src('src/sass/layouts/layout/themes/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputLayout + '/layout/css/themes'));

  gulp.src('src/sass/layouts/layout2/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputLayout + '/layout2/css'));
  gulp.src('src/sass/layouts/layout2/themes/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputLayout + '/layout2/css/themes'));  

  gulp.src('src/sass/layouts/layout4/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputLayout + '/layout4/css'));
  gulp.src('src/sass/layouts/layout4/themes/*.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputLayout + '/layout4/css/themes'));
});

//*** Custom SASS compiler task
gulp.task('sass-custom', function () {
  // custom theme compilation
  gulp.src('src/sass/xbicustom.scss').pipe(sass()).pipe(cssnano()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputGlobal + '/css')).pipe(reload({stream: true}));
});

//*** SASS watch(realtime) compiler task
gulp.task('sass:watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
});

//*** CSS & JS minify task
gulp.task('scripts', function () {
    //js minify
    gulp.src(['src/assets/global/scripts/*.js','!src/assets/global/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputGlobal + '/scripts'));
    gulp.src(['src/assets/pages/scripts/*.js','!src/assets/pages/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputPages + '/scripts'));
    gulp.src(['src/assets/layouts/**/scripts/*.js','!src/assets/layouts/**/scripts/*.min.js']).pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest(OutputLayout));
});

// image
gulp.task('images', function(){
    return gulp.src(ImageFiles)
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest(OutputImageFiles));
})

// gulp.task('watch', function(){
//     gulp.watch(CssFiles,['styles']);
//     gulp.watch(AllJsFiles,['app']);
// });

gulp.task('default', ['browser-sync'], function(){
    gulp.watch('src/sass/xbicustom.scss', ['sass-custom']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch('src/assets/***/**/*.js', ['scripts']);
    gulp.watch(['*.html'], ['bs-reload']);
});

gulp.task('prettify', function() {

    gulp.src('**/*.html').
    pipe(prettify({
        indent_size: 4, 
        indent_inner_html: true,
        unformatted: ['pre', 'code']
    })).
    pipe(gulp.dest('./'));
});

gulp.task('build', function(){
    gulp.start('sass', 'sass-custom', 'scripts', 'prettify');
});