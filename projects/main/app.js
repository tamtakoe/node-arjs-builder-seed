define([

    'angular',
    'angularLocale',
    'angularResource',
    'uiRouter',
    'angularBootstrap',
    'angularStrap'

], function(angular) {
    'use strict';

    return angular.module('app', [
        'ngResource',
        'uiBootstrap',
        'angularStrap',
        'ui.router'
    ]);
});