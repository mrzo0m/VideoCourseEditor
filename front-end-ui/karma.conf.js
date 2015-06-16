// Karma configuration
// Generated on Tue Apr 14 2015 12:14:45 GMT+0300 (Belarus Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/underscore/underscore.js',
      'bower_components/angular-i18n/angular-locale_ru-ru.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'app/app.module.js',
      'app/core/core.module.js',
      'app/core/core.config.js',
      'app/core/main.controller.js',
      'app/core/courses.service.js',
      'app/core/author.service.js',
      'app/core/backendservice.js',
      'app/core/app.constants.js',
      'app/authentication/authentication.module.js',
      'app/authentication/authentication.config.js',
      'app/authentication/authentication.interceptor.js',
      'app/authentication/authservice.js',
      'app/authentication/login.controller.js',
      'app/courses/courses.module.js',
      'app/courses/courses.controller.js',
      'app/course/course.module.js',
      'app/course/course.controller.js',
      'app/course/course.directive.js',
      'app/course/duration.directive.js',
      'app/course/modalservice.js',
      'app/course/datefield.directive.js',
      'app/course/multiselect.directive.js',
      'app/filters/search.filter.js',
      'app/filters/duration.filter.js',
      'tests/*.test.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS'],
    //browsers: ['Chrome', 'PhantomJS']


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
