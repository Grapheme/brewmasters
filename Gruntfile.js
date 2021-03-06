module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      dist: {
        // the files to concatenate
        src: [
          'js/vendor/jquery.cookie.js',
          'js/vendor/jquery.knob.js',
          'js/app/app.js',
          'js/app/exam.js',
          'js/app/popup.js',
          'js/app/reg.js',
          'js/app/test.js',
          'js/main.js',
          'js/plugins.js',
          'js/vendor/jquery.selectBox.js',
          'js/jquery.selectbox.init.js'
        ],
        // the location of the resulting JS file
        dest: 'js/index.js'
      }
    },
    less: {
      development: {
        options: {
          compress: false
        },
        files: {
          // target.css file: source.less file
          "css/main.css": "less/main.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['less/**/*.less', 'js/**/*.js'], // which files to watch
        tasks: ['less', 'concat'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);
};