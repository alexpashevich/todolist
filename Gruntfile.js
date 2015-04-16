module.exports = function(grunt) {
    'use strict';

    var lessSources = [
        'src/less/style.less'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: [
                    'src/less/*.less'
                ],
                tasks: ['less']
            },
            js: {
                files: [
                    'js/*.js'
                ],
                tasks: ['concat', 'uglify']
            }
        },
        less: {
            development: {
                options: {
                    plugins: [
                        new (require('less-plugin-autoprefix'))({browsers: ['last 2 versions']})
                    ]
                },
                files: {
                    'dist/bundle.css': lessSources
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'src/js/*.js'
                ],
                dest: 'dist/bundle.js'
            }
        },
        uglify: {
            bundle: {
                files: {
                    'dist/bundle.min.js': 'dist/bundle.js'
                }
            }
        },
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Register the default tasks.
    grunt.registerTask('build-less', ['less']);
    grunt.registerTask('build', ['less', 'concat', 'uglify']);
    grunt.registerTask('default', ['watch'])
};