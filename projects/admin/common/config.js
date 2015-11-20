define([

    'app',

    'main/common/components/flashMessage/config',

    'main/common/services/router/expandView',

    'admin/common/views/body/controller'

], function(app) {
    'use strict';

    app.constant("config", window.project.config);

    app.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    });

    app.config(function($urlRouterProvider) {
        $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.url();

            if (path[path.length - 1] === '/') {
                return path.slice(0, -1);
            }
            if (path.indexOf('/?') > -1) {
                return path.replace('/?', '?');
            }
        });
    });

    app.config(function($urlRouterProvider) {
        $urlRouterProvider.otherwise('/admin');
    });

    //disable strip trailing slashes
    app.config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    });

    app.config(function($stateProvider, expandViewProvider) {
        function mapValues(src, fn) {
            var dst = {};

            for (var key in src) {
                if (src.hasOwnProperty(key)) {
                    dst[key] = fn(src[key]);
                }
            }

            return dst;
        }

        $stateProvider.decorator('views', function(state, parent) {
            var views = parent(state);

            return mapValues(views, expandViewProvider.expand);
        });

        $stateProvider
            .state('body', {
                abstract: false,
                url: '/admin',
                views: {
                    body: 'common/body'
                }
            });
    });

});