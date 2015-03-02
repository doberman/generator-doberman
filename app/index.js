'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting: function() {
    var done = this.async();

    this.prompt({
      type: 'checkbox',
      name: 'features',
      message: 'What do you want to use?',
      choices: [{
        name: 'Doberman SCSS base structure',
        value: 'includeScssFramework',
        checked: true
      }]
    }, function(answers) {
      this.includeScssFramework = answers.features.indexOf('includeScssFramework') !== -1;
      done();
    }.bind(this));
  },

  cloneScss: function() {
    if (this.includeScssFramework) {
      this.bowerInstall(['git@github.com:doberman/dbrmn-scss-framework.git']);
    }
  },

  gruntfile: function() {
    this.template('Gruntfile.js');
  },

  packageJSON: function() {
    this.template('_package.json', 'package.json');
  },

  git: function() {
    this.template('gitignore', '.gitignore');
  },

  jshint: function() {
    this.template('jshintignore', '.jshintignore');
    this.template('jshintrc', '.jshintrc');
  },

  app: function() {
    this.directory('app');
    this.mkdir('app/styles');
  },

  install: function() {
    this.installDependencies();
  },

  end: function() {
    if (this.includeScssFramework) {
      this.directory(this.destinationRoot() + '/bower_components/dbrmn-scss-framework', 'app/styles');
    }
  }
});
