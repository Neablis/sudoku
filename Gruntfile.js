module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concurrent: {
            target1: ['jshint'],
            target2: ['nodemon', 'watch']
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'stylesheets/sass',
                    cssDir: 'stylesheets/css'
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
        jshint: {
            all: ['Gruntfile.js', 'food_truck/**/*.js']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('default', ['concurrent:target1', 'concurrent:target2']);
};