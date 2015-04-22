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
      },{
        name: 'Use Middleman folder strucure',
        value: 'useMiddleman',
        checked: false
      }]
    }, function(answers) {
      this.includeScssFramework = answers.features.indexOf('includeScssFramework') !== -1;
      this.useMiddleman = answers.features.indexOf('useMiddleman') !== -1;
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
    if(this.useMiddleman){
      var destination = this.readFileAsString('.gitignore');
      var template = this.readFileAsString(this.templatePath('gitignore'));
      this.write('.gitignore', destination + "\n\n# Added by doberman generator\n" + template);
    }else{
      this.template('gitignore', '.gitignore');
    }
  },

  jshint: function() {
    this.template('jshintignore', '.jshintignore');
    this.template('jshintrc', '.jshintrc');
  },

  app: function() {
    if(!this.useMiddleman){
      this.directory('app');
      this.mkdir('app/styles');
    }
  },

  install: function() {
    this.installDependencies();
  },

  end: function() {
    if (this.includeScssFramework) {
      if(this.useMiddleman){
        this.directory(this.destinationRoot() + '/bower_components/dbrmn-scss-framework', 'source/stylesheets');
        this.fs.delete('source/stylesheets/all.css');
        this.fs.delete('source/stylesheets/normalize.css');

        var src = this.readFileAsString('source/layouts/layout.erb');
        src = src.replace('<%= stylesheet_link_tag "normalize", "all" %>', '<%= stylesheet_link_tag "style" %>');
        this.write('source/layouts/layout.erb', src);

      } else {
        this.directory(this.destinationRoot() + '/bower_components/dbrmn-scss-framework', 'app/styles');
      }
    }
  }
});
