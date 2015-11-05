'use strict'

module.exports = function( grunt ) {
    grunt.initConfig( {
        pkg : grunt.file.readJSON( 'package.json' ),
        host : "http://192.168.2.103:8099/DZ/dist",
        dist : 'dist',
        replace : {
            dist : {
                options : {
                    patterns : [ {
                        json : {
                            "host" : "<%= host %>",
                            "path" : {
                                "static" : "<%= host %>/static",
                                "images" : "<%= host %>/static/images",
                                "js" : "<%= host %>/static",
                                "css" : "<%= host %>/static"
                            }
                        }
                    } ]
                },
                files : [ {
                    expand : true, 
                    src : [
                        '<%= dist %>/**/*.html',
                        '<%= dist %>/**/*.js',
                        '<%= dist %>/**/*.css'
                    ]
                } ]
            }
        },

        compass : {
            dist : {
                options : {
                    sassDir : 'src/static/',
                    cssDir : '<%= dist %>/static/',
                    relativeAssets : false
                }
            }
        },

        copy : {
            html : {
                files : [ {
                    expand : true,
                    flatten : true,
                    src : [ 'src/**/*.html' ],
                    dest : '<%= dist %>/'
                } ]
            },
            images : {
                files : [ {
                    expand : true,
                    cwd : 'src/static/images',
                    src : [ '**/*' ],
                    dest : '<%= dist %>/static/images/'
                } ]
            },
            scripts : {
                files : [ {
                    expand : true,
                    flatten : true,
                    src : [ 'src/static/**/*.js' ],
                    dest : '<%= dist %>/static/'
                } ]
            }
        },

        concat : {
            styles : {
                src : [ 'src/page.scss', 'src/slices/**/*.scss' ],
                dest : '<%= dist %>/static/page.scss'
            },
            scripts : {
                src : [ 
                    'src/page.js',
                    'src/slices/slice1/*.js',
                    'src/slices/slice2/*.js',
                    'src/slices/slice3/*.js',
                    'src/slices/slice4/*.js',
                    'src/slices/slice5/*.js',
                    'src/slices/slice6/*.js',
                    'src/slices/slice7/*.js',
                    'src/slices/slice8/*.js',
                    'src/slices/slice9/*.js',
                    'src/slices/slice10/*.js',
                    'src/slices/slice11/*.js',
                ],
                dest : '<%= dist %>/static/page.js'
            },
            html : {
                src : [ 'src/hd.html', 'src/tpl.html', 'src/slices/**/*.html', 'src/ft.html' ],
                dest : '<%= dist %>/index.html'
            }
        },

        watch : {
            css : {
                files : [ 'src/**/*' ],
                tasks : [ 'copy', 'compass', 'replace' ]
            }
        },

        tinypng : {
            options : {
                apiKey : '9ubnPRpwM5Okc8a75nhM6K0Yt7k8GtCE',
                checkSigs : true,
                sigFile : 'dist/static/images/file_sigs.json',
                summarize : true,
                showProgress : true,
                stopOnImageError : true
            },
            compress : {
                expand : true,
                src : 'dist/static/images/**/*.png',
                ext : '.png'
            }
        },
        uglify : {
            all : {
                files : [ {
                    expand : true,
                    src : 'dist/static/js/**/*.js'
                } ]
            }
        },

        cssmin : {
            all : {
                files : [ {
                    expand : true,
                    src : 'dist/static/css/**/*.css'
                } ]
            }
        }


    } );

    grunt.loadNpmTasks( 'grunt-contrib-compass' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-replace' );
    //grunt.loadNpmTasks( 'grunt-tinypng' );
    //grunt.loadNpmTasks( 'grunt-contrib-uglify' );
    //grunt.loadNpmTasks( 'grunt-contrib-cssmin' );

    grunt.registerTask( 'remove', function( e ) {
        grunt.file.delete( './dist', { force : true } );
    } );

    grunt.registerTask( 'default', [ 'remove', 'copy', 'compass', 'replace' ] );
};
