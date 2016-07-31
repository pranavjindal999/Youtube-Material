module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/js/_temp/service/service.min.js': 'src/js/services/**/*.js',
                    'dist/js/_temp/controllers/controller.min.js': 'src/js/modules/**/*.js',
                    'dist/js/_temp/directives/directive.min.js': 'src/js/directives/**/*.js',
                    'dist/js/_temp/library/lib.min.js': ['src/js/library/angular.min.js', 'src/js/library/angular-ui-router.min.js', 'src/js/library/angular-scroll.min.js', 'src/js/library/angular-touch.min.js', 'src/js/library/jquery-2.1.1.min.js', 'src/js/library/materialize.min.js', 'src/js/library/angular-materialize.min.js', 'src/js/library/moment.min.js', 'src/js/library/moment-format.min.js', 'src/js/library/nprogress.js'],
                    'dist/js/_temp/app.config.min.js': 'src/js/app.config.js',
                    'dist/js/youtube.min.js': ['dist/js/_temp/library/lib.min.js', 'dist/js/_temp/app.config.min.js', 'dist/js/_temp/directives/directive.min.js', 'dist/js/_temp/service/service.min.js', 'dist/js/_temp/controllers/controller.min.js']
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            build: {
                files: {
                    'dist/css/style.min.css': ['src/css/materialize.min.css', 'src/css/icons.css', 'src/css/nprogress.css', 'src/css/main.css']
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
