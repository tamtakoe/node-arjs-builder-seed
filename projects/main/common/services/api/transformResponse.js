define([

    'app'

], function(app) {
    "use strict";

    app.factory('apiResourceTransformResponse', function($http) {
        function transformResponse(response) {
            var meta = response.meta;

            if (response.hasOwnProperty('data') && typeof response.data === 'object') {
                response = response.data;
            }

            if (meta) {
                response.$$meta = meta;
            }

            return response;
        }

        return $http.defaults.transformResponse.concat(transformResponse);
    });
});
