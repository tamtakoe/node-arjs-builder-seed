define([

    'app',

    'main/common/services/api/interceptor',
    'main/common/services/api/transformResponse'

], function(app) {
    "use strict";

    app.factory('apiResource', function($resource, ApiResourceInterceptor, apiResourceTransformResponse, config) {
        var DEFAULT_ACTIONS = {
            get: { method: 'GET' },
            save: { method: 'PATCH', accessToken: true }, // todo: create or update
            query: { method: 'GET', isArray: true },
            remove: { method: 'DELETE', accessToken: true },
            delete: { method: 'DELETE', accessToken: true },
            create: { method: 'POST', accessToken: true },
            patch: { method: 'PATCH', accessToken: true }
        };

        function apiResource(url, paramDefaults, actions) {
            // Append host and version to url
            url = addUrlPrefix(url);

            // Add response transformation for all actions
            actions = angular.extend({}, DEFAULT_ACTIONS, actions);

            angular.forEach(actions, function(settings) {
                settings.interceptor = new ApiResourceInterceptor(settings.interceptor);

                if (config.resources.api.login) {
                    settings.headers = settings.headers || {};
                    settings.headers.Authorization = 'Basic ' + btoa(config.resources.api.login + ':' + config.resources.api.password);
                }

                if (!settings.transformResponse) {//merge settings.transformResponse and apiResourceTransformResponse
                    settings.transformResponse = apiResourceTransformResponse;
                }
                if (settings.url) {
                    settings.url = addUrlPrefix(settings.url);
                }
            });

            return $resource(url, paramDefaults, actions);
        }

        return apiResource;

        function addUrlPrefix(url) {
            return config.resources.api.host + '/' + url;
        }
    });
});
