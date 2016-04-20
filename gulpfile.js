'use strict';

/////////////////////////////////////////////////////////////////////////
//                      PLUGINS & MODULES                              //
/////////////////////////////////////////////////////////////////////////


let gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    connect         = require('gulp-connect'),
    csscomb         = require('gulp-csscomb'),
    csso            = require('gulp-csso'),
    htmlhint        = require('gulp-htmlhint'),
    htmlmin         = require('gulp-htmlmin'),
    imagemin        = require('gulp-imagemin'),
    sass            = require('gulp-sass'),
    stripDebug      = require('gulp-strip-debug'),
    uglify          = require('gulp-uglify'),
    util            = require('gulp-util');


/////////////////////////////////////////////////////////////////////////
//                              PATH                                   //
/////////////////////////////////////////////////////////////////////////


let path = {};

path.dev = {};
path.public = {};

let app = "dev/app/";
path.dev.app = app;
path.dev.components = app + "components/";
path.dev.services = app + "services/";
path.dev.shared = app + "shared/";

let assets = "dev/assets/";
path.dev.img = assets + "img/";
path.dev.lib = assets + "lib/";

let pbl = "public/";

path.public.css = pbl + "css/";
path.public.img = pbl + "img/";
path.public.js = pbl + "js/";
path.public.lib = pbl + "lib/";
path.public.templates = pbl + "templates/";

let production = util.env.type === 'prod';


/////////////////////////////////////////////////////////////////////////
//                         CONNECT TASKS                               //
/////////////////////////////////////////////////////////////////////////



gulp.task ('connect', () => {
	connect.server({
    root: 'public/',
    port: 3000,
    livereload: true
  });
});