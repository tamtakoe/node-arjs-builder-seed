define([

    'app',

    'main/homepage/resources/users',

    'main/homepage/directives/header/directive',

    'main/homepage/views/index/controller'

], function(app) {
    'use strict';

    app.config(function($stateProvider) {
        $stateProvider
            .state('homepage', {
                parent: 'body',
                url: '/',
                views: {
                    'main': 'homepage/index'
                }
            });
    });
});