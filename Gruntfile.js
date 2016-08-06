module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/_temp/services.min.js': 'src/js/services/**/*.js',
                    'dist/js/_temp/controllers.min.js': 'src/js/modules/**/*.js',
                    'dist/js/_temp/directives.min.js': 'src/js/directives/**/*.js',
                    'dist/js/_temp/libs.min.js': ['src/js/library/angular.js', 'src/js/library/angular-ui-router.js', 'src/js/library/angular-scroll.js', 'src/js/library/angular-touch.js', 'src/js/library/jquery-2.1.1.js', 'src/js/library/materialize.js', 'src/js/library/angular-materialize.js', 'src/js/library/moment.js', 'src/js/library/moment-duration-format.js', 'src/js/library/nprogress.js'],
                    'dist/js/_temp/app.config.min.js': 'src/js/app.config.js',
                    'dist/js/youtube.min.js': ['dist/js/_temp/libs.min.js', 'dist/js/_temp/app.config.min.js', 'dist/js/_temp/directives.min.js', 'dist/js/_temp/services.min.js', 'dist/js/_temp/controllers.min.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': ['src/css/materialize.css', 'src/css/icons.css', 'src/css/nprogress.css', 'src/css/main.css']
                }
            }
        },
        purifycss: {
            options: {},
            target: {
                src: ['dist/js/youtube.min.js', 'src/**/*.html'],
                css: ['dist/css/style.min.css'],
                dest: 'dist/css/style.purified.min.css'
            },
        }
    });
    grunt.registerTask('default', ['uglify', 'cssmin', 'purifycss']);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-purifycss');
};
