define([

    'app'

], function(app) {
    "use strict";

    app.factory('prerenderInterceptor', function($q, prerender) {
        return {
            request: function(config) {
                prerender.wait('$http ' + config.url);

                return config;
            },
            requestError: function(rejection) {
                prerender.ready('$http error request');

                return $q.reject(rejection);
            },
            response: function(response) {
                prerender.ready('$http ' + response.config.url);

                return response;
            },
            responseError: function(rejection) {
                prerender.ready('$http error response');

                return $q.reject(rejection);
            }
        };
    });
});
