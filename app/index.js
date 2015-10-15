'use strict';

var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  prompting: {
    askForTaskrunner: function() {
      var done = this.async();

      this.prompt({
        type: 'list',
        name: 'taskrunner',
        message: 'Which task runner would you like to use?',
        choices: [{
          name: 'Gulp',
          value: 'gulp'
        },{
          name: 'Grunt',
          value: 'grunt'
        }],
        default: 0
      }, function(answers) {
        console.log(answers);
        // this.taskRunner = answers.taskrunner
        this.taskRunner = answers.taskrunner;
        done();
      }.bind(this));
    },

    askForScssFramework: function() {
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
    }
  },

  cloneScss: function() {
    if (this.includeScssFramework) {
      this.bowerInstall(['git@github.com:doberman/dbrmn-scss-framework.git']);
    }
  },

  taskRunner: function() {
    switch (this.taskRunner) {
      case 'gulp':
        this.template('Gulpfile.js');
        break;
      case 'grunt':
        this.template('Gruntfile.js');
        break;
    }
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
    this.mkdir('app/stylesheets');
  },

  html: function() {
    this.template('index.html', 'app/index.html');
  },

  install: function() {
    this.installDependencies();
  },

  end: function() {
    if (this.includeScssFramework) {
      this.directory(this.destinationRoot() + '/bower_components/dbrmn-scss-framework', 'app/stylesheets');
    }
  }
});
