module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            target1: {
                tasks: ['jshint'],
                options: {
                    logConcurrentOutput: true
                }
            },
            target2: {
                tasks: ['nodemon', 'watch', 'karma:dev'],
                options: {
                    logConcurrentOutput: true
                }
            },
        },
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['compass']
            }
        },
        nodemon: {
            dev: {
                script: 'server/server.js',
                options: {
                    file: 'server/server.js',
                    watchedFolders: ['server'],
                    env: {
                        PORT: '3300'
                    }
                }
            }
        },
        karma: {
            run: {
                configFile: 'karma.conf.js',
                singleRun: true
            },
            dev: {
                configFile: 'karma.conf.js',
                autoWatch: true
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'assets/js/*.js']
        }
    });

    //Loading tasks
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-karma');

    // Registering tasks
    grunt.registerTask('default', ['concurrent:target1', 'concurrent:target2']);
    grunt.registerTask('test', ['karma:dev']);
};