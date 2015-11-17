define([

    'app',

    'main/common/components/flashMessage/config',
    'main/common/components/meta/config',
    'main/common/components/meta/resources/metaData',

    'main/common/services/router/expandView',
    'main/common/services/api/resource',
    'main/common/services/api/interceptor',
    'main/common/services/api/transformResponse',
    'main/common/services/config',

    'main/common/views/body/controller'

], function(app) {
    'use strict';

    app.config(function($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    });

    app.config(function($urlRouterProvider, config) {
        angular.forEach(config.redirects, function(value, key) {
            $urlRouterProvider.when(key, value);
        });

        $urlRouterProvider.otherwise(function($injector) {
            console.log('Not Found Page');
        });

        $urlRouterProvider.rule(function($injector, $location) {
            var path = $location.url();

            if (path[path.length - 1] === '/') { //remove end slash
                return path.slice(0, -1);
            }
            if (path.indexOf('/?') > 0) { //remove end slash (but not first) before query params
                return path.replace('/?', '?');
            }
        });
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
                abstract: true,
                views: {
                    body: 'common/body'
                }
            });
    });
});