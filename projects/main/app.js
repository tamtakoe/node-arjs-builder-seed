define([

    'angular',
    'angularLocale',
    'angularResource',
    'uiRouter',

    'angularBootstrap',
    'angularStrap',

    'commandQueue'

], function(angular) {
    'use strict';

    return angular.module('app', [
        'ngResource',
        'uiBootstrap',
        'angularStrap',
        'ui.router'
    ]);
});