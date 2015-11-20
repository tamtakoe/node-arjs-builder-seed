// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html

'use strict';

module.exports = function(config) {

    config.set({
        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress'],

        // web server port
        port: 8080,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],

        // Timeouts for SauceLabs
        browserDisconnectTimeout: 10000, // default 2000
        browserDisconnectTolerance: 2, // default 0
        browserNoActivityTimeout: 30 * 1000 //default 10000
    });

};