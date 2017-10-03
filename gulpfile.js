'use strict';

const gulp   = require('gulp');
const rimraf = require('gulp-rimraf');
const tslint = require('gulp-tslint');
const lab    = require('gulp-lab');
const shell  = require('gulp-shell');
const env    = require('gulp-env');
const runSequence = require('run-sequence');
const fs     = require('fs');

/**
 * Remove build directory.
 */
gulp.task('clean', function () {
  return gulp.src(outDir, { read: false })
    .pipe(rimraf());
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint( { 
      formatter: 'prose'
    }))
    .pipe(tslint.report());
});

/**
 * Compile TypeScript.
 */

function compileTS(args, cb) {
  return exec(tscCmd + args, (err, stdout, stderr) => {
    console.log(stdout);

    if (stderr) {
      console.log(stderr);
    }
    cb(err);
  });
}

gulp.task('compile', shell.task([
  'npm run tsc',
]));

/**
 * Watch for changes in TypeScript
 */
gulp.task('watch', shell.task([
  'npm run tsc-watch',
]));
/**
 * Copy config files
 */
gulp.task('configs', (cb) => {
  const envFile = '.env.json';
  if(fs.existsSync(envFile)) {
    env({
      file: envFile
    });
  }

  if(process.env.SOLCAST_API_KEY) {
    env.set({
      SOLCAST_API_KEY: process.env.SOLCAST_API_KEY
    });
  }

  return gulp.src("src/configurations/*.json")
    .pipe(gulp.dest('./dist/src/configurations'));
});

/**
 * Build the project.
 */
gulp.task('build', (callbackFn) => {
  console.log('Building the project ...');
  runSequence('tslint',
    'compile',
    'configs',
    callbackFn
  );
});

/**
 * Run tests.
 */
gulp.task('test', ['build'], (cb) => {
  const envs = env.set({
    NODE_ENV: 'test'
  });

  const labOptions = {
    args: '-D -R -S -l -v',
    opts: {
      emitLabError: true
    }
  };

  gulp.src(['dist/test/**/*.js'])
    .pipe(envs)
    .pipe(lab(labOptions))
    .once('error', (error) => {
      console.log(error);
      process.exit(1);
    })
    .once('end', () => {
      process.exit();
    });
});

gulp.task('default', ['build']);
