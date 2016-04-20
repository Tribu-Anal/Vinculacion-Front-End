'use strict';

/////////////////////////////////////////////////////////////////////////
//                      PLUGINS & MODULES                              //
/////////////////////////////////////////////////////////////////////////


let gulp            = require('gulp'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    csscomb         = require('gulp-csscomb'),
    csso            = require('gulp-csso'),
    htmlhint        = require('gulp-htmlhint'),
    htmlmin         = require('gulp-htmlmin'),
    imagemin        = require('gulp-imagemin'),
    sass            = require('gulp-sass'),
    stripDebug      = require('gulp-strip-debug'),
    uglify          = require('gulp-uglify'),
    util            = require('gulp-util');