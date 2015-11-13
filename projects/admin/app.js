define([

    'angular',
    'angularLocale',
    'angularResource',
    'uiRouter'

], function(angular) {
    'use strict';

    return angular.module('app', [
        'ngResource',
        'ui.router'
    ]);
});