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

path.dev    = {};
path.public = {};

path.dev.app = "dev/app/";

let assets   = "dev/assets/";
path.dev.img = assets + "img/";
path.dev.lib = assets + "lib/";

let pbl = "public/";

path.public.css       = pbl + "css/";
path.public.img       = pbl + "img/";
path.public.js        = pbl + "js/";
path.public.lib       = pbl + "lib/";
path.public.templates = pbl + "templates/";

let production = util.env.type === 'prod';


/////////////////////////////////////////////////////////////////////////
//                            SOURCE                                   //
/////////////////////////////////////////////////////////////////////////



let appJs       = [ path.dev.app + "**/*.js", path.dev.app  + "**/*.*.js" ],
    vendorJs    = [ path.dev.lib + "jQuery/*.js", path.dev.lib + "angular/*.js",
    				path.dev.lib + "**/*.js" ],
    vendorCss   = [ path.dev.lib + "**/*.css", path.dev.lib + "**/*.*.css" ],
    sassSrc     = [ path.dev.app + "**/*.scss" ],
    templateSrc = [ path.dev.app + "**/*.html", path.dev.app + "**/*.*.html" ],
    imgSrc      = [ path.dev.img + "*.jpg", path.dev.img + "*.png" ];



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



/////////////////////////////////////////////////////////////////////////
//                            JS TASKS                                 //
/////////////////////////////////////////////////////////////////////////


gulp.task ( 'app-js', () => {
	return gulp.src( appJs )
		.pipe( concat('bundle.js') )
		.pipe( production ? uglify() : util.noop() )
		.pipe( production ? stripDebug() : util.noop() )
		.pipe( gulp.dest(path.public.js) )
		.pipe( connect.reload() );
} );

gulp.task ( 'vendor-js', () => {
	return gulp.src( vendorJs )
		.pipe( concat('vendor.js') )
		.pipe( production ? uglify() : util.noop() )
		.pipe( gulp.dest(path.public.lib) )
		.pipe( connect.reload() );
} );


/////////////////////////////////////////////////////////////////////////
//                            CSS TASKS                                //
/////////////////////////////////////////////////////////////////////////



gulp.task ( 'css', () => {
	return gulp.src ( sassSrc )
		.pipe( sass() )
		.pipe( concat('style.css') )
		.pipe( csso (
			{
	            restructure: production,
	            sourceMap: !production,
	            debug: !production
        	}
        ))
		.pipe( production ? util.noop() : csscomb() )
		.pipe( autoprefixer( { browsers: [ "> 0%" ] } ) )
		.pipe( gulp.dest(path.public.css) )
		.pipe( connect.reload() );
} );

gulp.task ( 'vendor-css', () => {
	return gulp.src ( vendorCss )
		.pipe( concat('vendor.css') )
		.pipe( csso (
			{
	            restructure: production,
	            sourceMap: !production,
	            debug: !production
        	}
        ))
		.pipe( production ? util.noop() : csscomb() )
		.pipe( gulp.dest(path.public.lib) )
		.pipe( connect.reload() );
} );


/////////////////////////////////////////////////////////////////////////
//                           HTML TASKS                                //
/////////////////////////////////////////////////////////////////////////


gulp.task ( 'templates', () => {
	return gulp.src( templateSrc )
		.pipe( htmlmin( { collapseWhitespace: true } ) )
		.pipe( htmlhint() )
		.pipe( gulp.dest( path.public.templates ) )
		.pipe( connect.reload() );
} );

gulp.task( 'reload-index', () => { 
	return gulp.src("public/index.html")
		.pipe(connect.reload()); 
} );


/////////////////////////////////////////////////////////////////////////
//                       RESOURCES TASKS                               //
/////////////////////////////////////////////////////////////////////////



gulp.task ( 'img', () => {
	return gulp.src( imgSrc )
		.pipe( imagemin() )
		.pipe( gulp.dest( path.public.img ) )
		.pipe( connect.reload() );
} );



/////////////////////////////////////////////////////////////////////////
//                              WATCH                                  //
/////////////////////////////////////////////////////////////////////////



gulp.task ( 'watch', () => {
	gulp.watch ( appJs, ['app-js'] );
	gulp.watch ( vendorJs, ['vendor-js'] );
	gulp.watch ( vendorCss, ['vendor-css'] );
	gulp.watch ( sassSrc, ['css'] );
	gulp.watch ( templateSrc, ['templates'] );
	gulp.watch ( imgSrc, ['img'] );
	gulp.watch ( "public/index.html", ['reload-index'] );
} );



/////////////////////////////////////////////////////////////////////////
//                            DEFAULT                                  //
/////////////////////////////////////////////////////////////////////////


gulp.task ( 'default', [ 'vendor-js', 'app-js', 'vendor-css', 'css', 
                         'img', 'templates', 'connect', 'watch' ] );