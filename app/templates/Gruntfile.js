'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      scss: {
        files: ['app/stylesheets/**/*.scss'],
        tasks: ['sass']
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/stylesheets',
          src: ['*.scss'],
          dest: 'app/stylesheets',
          ext: '.css'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass']);
};
