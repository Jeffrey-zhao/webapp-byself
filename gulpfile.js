var gulp =require('gulp'),
	$=require('gulp-load-plugins')(),
	open=require('open');

var ROOTPATH={
	dev:'build/',
	src:'src/',
	prd:'dist/'
};

var PATH={
	js:{
		srcPath:ROOTPATH.src+'script/**/*.js',
		devPath:ROOTPATH.dev+'js',
		prdPath:ROOTPATH.prd+'js'
	},
	lib:{
		srcPath:'bower_components/**/*.js',
		devPath:ROOTPATH.dev+'vendor',
		prdPath:ROOTPATH.prd+'vendor'
	},
	less:{
		srcPath:ROOTPATH.src+'style/**/*.less',
		devPath:ROOTPATH.dev+'css',
		prdPath:ROOTPATH.prd+'css'
	},
	html:{
		srcPath:ROOTPATH.src+'**/*.html',
		devPath:ROOTPATH.dev+'js',
		prdPath:ROOTPATH.prd+'js'
	},
	clean:{
		srcPath:'',
		devPath:ROOTPATH.dev,
		prdPath:ROOTPATH.prd
	},
	json:{
		srcPath:ROOTPATH.src+'data/**/*.json',
		devPath:ROOTPATH.dev+'data',
		prdPath:ROOTPATH.prd+'data'
	},
	image:{
		srcPath:ROOTPATH.src+'image/**/*',
		devPath:ROOTPATH.dev+'image',
		prdPath:ROOTPATH.prd+'image'
	},
	build:{
		srcPath:'',
		devPath:'',
		prdPath:''
	},
	server:{
		srcPath:'',
		devPath:ROOTPATH.dev,
		prdPath:ROOTPATH.prd
	}
};

// gulp js files 
//when add preserverComments:'all' occurs error?
gulp.task('js',function(){
	gulp.src(PATH.js.srcPath)
		.pipe($.concat('index.js'))
		.pipe(gulp.dest(PATH.js.devPath))
		.pipe($.uglify({
			mangle:true,
			compress:true
		}))
		.pipe(gulp.dest(PATH.js.prdPath))
		.pipe($.connect.reload())
});

//gulp component files
gulp.task('lib',function(){
	gulp.src(PATH.lib.srcPath)
		.pipe(gulp.dest(PATH.lib.devPath))
		.pipe(gulp.dest(PATH.lib.prdPath))
		.pipe($.connect.reload())

})

//gulp less files
gulp.task('less',function(){
	gulp.src(PATH.less.srcPath)
		.pipe($.sourcemaps.init())
		.pipe($.less()) //less 
		.pipe($.sourcemaps.write())
		.pipe(gulp.dest(PATH.less.devPath))
		.pipe($.cssmin())
		.pipe(gulp.dest(PATH.less.prdPath))
		.pipe($.connect.reload())

});

//gulp html files
gulp.task('html',function(){
	gulp.src(PATH.html.srcPath)
		.pipe(gulp.dest(PATH.html.devPath))
		.pipe(gulp.dest(PATH.html.prdPath))
		.pipe($.connect.reload())

});

//gulp clean generate files
gulp.task('clean',function(){
	gulp.src([PATH.clean.devPath,PATH.clean.prdPath])
		.pipe($.clean({force:true}))
});

//gulp json files
gulp.task('json',function(){
	gulp.src(PATH.json.srcPath)
		.pipe(gulp.dest(PATH.json.devPath))
		.pipe(gulp.dest(PATH.json.prdPath))
		.pipe($.connect.reload())

});

//gulp image files 
gulp.task('image',function(){
	gulp.src(PATH.image.srcPath)
		.pipe(gulp.dest(PATH.image.devPath))
		//.pipe($.imagemin())
		.pipe(gulp.dest(PATH.image.prdPath))
		.pipe($.connect.reload())
		
});

gulp.task('build',['lib','html','json','js','less','image']);

gulp.task('server',['build'],function(){
	$.connect.server({
		root:[PATH.server.devPath],
		livereload:true,
		port:1111
	});
	open('http://localhost:1111');
	gulp.watch(PATH.lib.srcPath,['lib']);
	gulp.watch(PATH.json.srcPath,['json']);
	gulp.watch(PATH.less.srcPath,['less']);
	gulp.watch(PATH.js.srcPath,['js']);
	gulp.watch(PATH.image.srcPath,['image']);
	gulp.watch(PATH.html.srcPath,['html']);
});

gulp.task('default',['server']);

