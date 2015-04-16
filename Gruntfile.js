/*!
 * Bootstrap's Gruntfile
 * http://getbootstrap.com
 * Copyright 2013-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

module.exports = function(grunt) {
  grunt.initConfig({
    bspkg: grunt.file.readJSON('bower_components/bootstrap/package.json'),
    bspath: 'bower_components/bootstrap',
    banner: '/*!\n' +
            ' * Bootstrap v<%= bspkg.version %> (<%= bspkg.homepage %>)\n' +
            ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= bspkg.author %>\n' +
            ' * Licensed under <%= bspkg.license.type %> (<%= bspkg.license.url %>)\n' +
			' * Modified for Capital Home \n' +
			' * Author Ben <ben@coterie.co.ke> \n' +
			' * Last edit <%= grunt.template.today("dd-mm-yyyy") %>\n' +
            ' */\n',
	cfmbanner: '/*!\n' +
            ' * Capital Group Limited (http://www.capitalfm.co.ke)\n' +
            ' * Copyright 1996 - <%= grunt.template.today("yyyy") %>\n' +
			' * Author Ben <ben@coterie.co.ke> \n' +
			' * Last edit <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>\n' +
            ' */\n',
	scriptbanner: '/**\n' +
            ' * Capital Group Limited (http://www.capitalfm.co.ke)\n' +
            ' * Copyright 1996 - <%= grunt.template.today("yyyy") %>\n' +
			' * Author Ben <ben@coterie.co.ke> \n' +
			' * Modified <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>\n' +
            ' */',
    less: {
      compileCore: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: 'bootstrap.css.map',
          sourceMapFilename: 'css/bootstrap.css.map',
          paths: 'less'
        },
		src: 'less/bootstrap.less',
		dest: 'css/bootstrap.css'
      },
	  compileTheme: {
        options: {
          paths: ['css/less']
        },
		src: 'css/less/style.less',
		dest: 'css/style.css',
      },
	  compileAdmin: {
        options: {
          paths: ['css/less']
        },
		src: 'css/less/admin.less',
		dest: 'css/admin.css',
      }
    },
    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      core: {
        options: {
          map: true
        },
        src: 'css/bootstrap.css'
      }
    },
    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: '*',
        noAdvanced: true
      },
      minifyCore:
	  {
		  src: 'css/bootstrap.css',
		  dest: 'css/bootstrap.min.css'
	  },
	  minifyTheme:
	  {
		  src: 'css/style.css',
		  dest: 'css/style.min.css'
	  },
	  minifyAdmin:
	  {
		  src: 'css/admin.css',
		  dest: 'css/admin.min.css'
	  }
    },
    usebanner: {
      bootstrap:
	  {
		  options: {
			position: 'top',
			banner: '<%= banner %>'
		  },
		  files: {
			src: 'css/bootstrap.css'
		  }
	  },
	  theme:
	  {
		  options: {
			position: 'top',
			banner: '<%= cfmbanner %>'
		  },
		  files: {
			src: 'css/style.css'
		  }
	  },
	  script:
	  {
		  options: {
			position: 'top',
			banner: '<%= scriptbanner %>'
		  },
		  files: {
			src: 'dist/core.min.js'
		  }
	  },
	  scriptAdmin:
	  {
		  options: {
			position: 'top',
			banner: '<%= scriptbanner %>'
		  },
		  files: {
			src: 'dist/core.min.js'
		  }
	  }
    },
	watch: {
      less: {
		  files: 'css/less/**/*.less',
		  tasks: ['less:compileTheme', 'less:compileAdmin','usebanner:theme', 'cssmin:minifyTheme', 'copy']
      },
	  php: {
		  files: './**/*.php',
		  tasks: 'copy'
      }
    },
	copy: {
	  main: {
		files: [
		  // includes files within path 
		  {expand: true, src: ['css/*','fonts/*','lib/**','inc/**','page-templates/**','templates/**','languages/*','images/**','js/*.js'], dest: '../cdmhome/', filter: 'isFile'},
	 
		  // includes files within path and its sub-directories 
		  {expand: true, src: ['./*.php','./*.png','./*.css'], dest: '../cdmhome/', filter:'isFile'},
		  
		  {expand: true, src: ['dist/*.js'], flatten: true, dest: '../cdmhome/js/', filter:'isFile'},
		  {expand: true, src: ['dist/*.js'], flatten: true, dest: 'js/', filter:'isFile'},
	 
		  // makes all src relative to cwd 
		  //{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
	 
		  // flattens results to a single level 
		  //{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
		],
	  },
	},
	closureBuilder:  {
	  options: {
		// [REQUIRED] To find the builder executable we need either the path to 
		//    closure library or directly the filepath to the builder: 
		closureLibraryPath: 'E:/tools/google/closure/library', // path to closure library 
		// [OPTIONAL] You can define an alternative path of the builder. 
		//    If set it trumps 'closureLibraryPath' which will not be required. 
		builder: 'E:/tools/google/closure/library/closure/bin/build/closurebuilder.py',
	 
		// [REQUIRED] One of the two following options is required: 
		//inputs: 'string|Array', // input files (can just be the entry point)
		
		
	 
		// [OPTIONAL] Define the Python binary: 
		//pythonBinary: '/path/to/binary/python/',
	 
		// [OPTIONAL] The location of the compiler.jar 
		// This is required if you set the option "compile" to true. 
		compilerFile: 'E:/tools/google/closure/compiler/compiler.jar',
	 
		// [OPTIONAL] output_mode can be 'list', 'script' or 'compiled'. 
		//    If compile is set to true, 'compiled' mode is enforced. 
		//    Default is 'script'. 
		output_mode: 'compiled',
	 
		// [OPTIONAL] if we want builder to perform compile 
		compile: true, // boolean 
	 
		compilerOpts: {
		  /**
		  * Go wild here...
		  * any key will be used as an option for the compiler
		  * value can be a string or an array
		  * If no value is required use null
		  */
		  compilation_level: 'ADVANCED_OPTIMIZATIONS',
		  externs: ['E:/tools/google/closure/library/externs/*.js'],
		  define: ["'goog.DEBUG=false'"],
		  warning_level: 'verbose',
		  //jscomp_off: ['checkTypes', 'fileoverviewTags'],
		  summary_detail_level: 3,
		  output_wrapper: '"(function(){%output%}).call(window);"'
		},
		// [OPTIONAL] Set exec method options 
		execOpts: {
		   /**
			* Set maxBuffer if you got message "Error: maxBuffer exceeded."
			* Node default: 200*1024
			*/
		   maxBuffer: 999999 * 1024
		}
	 
	  },
	 
	  // any name that describes your operation 
	  shrink:
	  {
	 	options: {
          paths: ['src'],
		  namespaces: ['cfm.init'], // namespaces  cfm.init admin.init
        },
		// [REQUIRED] paths to be traversed to build the dependencies 
		src: ['src','E:/tools/google/closure/library/closure/goog','E:/tools/google/closure/library/lib', 'E:/tools/google/closure/library/third_party'],
	 
		// [OPTIONAL] if not set, will output to stdout 
		dest: 'dist/core.min.js'
	  },
	  shrinkAdmin:
	  {
	 	options: {
          paths: ['src'],
		  namespaces: ['admin.init'], // namespaces  cfm.init admin.init
        },
		// [REQUIRED] paths to be traversed to build the dependencies 
		src: ['src','E:/tools/google/closure/library/closure/goog','E:/tools/google/closure/library/lib', 'E:/tools/google/closure/library/third_party'],
	 
		// [OPTIONAL] if not set, will output to stdout 
		dest: 'dist/admin.min.js'
	  }
	},
  });

  // Loading our grunt modules
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-banner');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-closure-tools');

  grunt.registerTask('default', ['less:compileCore', 'less:compileTheme', 'autoprefixer', 'usebanner:bootstrap','usebanner:theme', 'cssmin','closureBuilder:shrink','usebanner:script', 'copy']);
  
  grunt.registerTask('compile-css', ['less:compileCore', 'less:compileTheme', 'autoprefixer', 'usebanner:bootstrap','usebanner:theme', 'cssmin','copy']);
  
  grunt.registerTask('themify', ['copy']);
  
  grunt.registerTask('compile-js', ['closureBuilder:shrink','usebanner:script','copy']);
  
  grunt.registerTask('compile-adminjs', ['closureBuilder:shrinkAdmin','usebanner:scriptAdmin','copy']);
  
 // grunt.registerTask('watch', ['watch']);

};