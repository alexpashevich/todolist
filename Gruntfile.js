module.exports = function(grunt) {
    'use strict';

    var lessSources = [
        'style.less'
    ];

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            css: {
                files: [
                    '**/*.less'
                ],
                tasks: ['less']
            },
            js: {
                files: [
                    'js/*.js'
                ],
                tasks: ['jshint', 'concat', 'uglify']
            },
            jshint: {
                files: '.jshintrc',
                tasks: 'jshint'
            },
            all: {
                files: 'Gruntfile.js',
                tasks: ['build']
            },
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'index.html', 'dist/*'
                ]
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
                    'style.css': lessSources
                }
            }
        }
    });

    // Load the Grunt plugins.
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-shell');

    // Register the default tasks.
    grunt.registerTask('build', ['shell:bower', 'less', 'jshint', 'concat', 'uglify']);
    grunt.registerTask('default', ['build', 'connect:server', 'watch']);
};