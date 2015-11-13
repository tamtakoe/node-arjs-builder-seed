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

    app.run(function($rootScope) {
        function showBodyPreloader() {
            $rootScope.$loading = true;
        }

        function hideBodyPreloader() {
            $rootScope.$loading = false;
        }

        $rootScope.$on('$stateChangeStart',   showBodyPreloader);
        $rootScope.$on('$stateChangeSuccess', hideBodyPreloader);
        $rootScope.$on('$stateChangeError',   hideBodyPreloader);
        $rootScope.$on('$stateNotFound',      hideBodyPreloader);
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

    app.run(function($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
        }
    );

    //disable strip trailing slashes
    app.config(function($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    });

    //set autorization
    app.run(function($q, accessToken) {
        accessToken.$populate({
            access_token: 'yy3bwux9zepecg8gt9a4at657m28yegf',
            $promise:     $q.when(),
            $resolved:    true
        });
    });

    app.config(function($stateProvider, expandViewProvider) {
        $stateProvider.decorator('views', function(state, parent) {
            var views = parent(state);

            return _.mapValues(views, expandViewProvider.expand);
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