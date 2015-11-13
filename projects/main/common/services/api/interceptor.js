define([

    'app',

    'main/common/components/flashMessage/services/flashMessage'

], function(app) {
    "use strict";

    app.factory('ApiResourceInterceptor', function($q, $timeout, flashMessage) {

        return function ApiResourceInterceptor(customInterceptor) {
            this.response = function(response) {
                response.resource.$meta = response.data.$$meta;

                if (customInterceptor && angular.isFunction(customInterceptor.response) && !(customInterceptor instanceof ApiResourceInterceptor)) {
                    return customInterceptor.response(response.resource, response);
                }
                return response.resource;
            };

            this.responseError = function(rejection) {
                var error = {};
                var flashMessageTitle;
                var flashMessageOptions;

                if (rejection && rejection.data) {
                    error = rejection.data;
                    error.status = error.status || rejection.status;
                    error.statusText = error.statusText || rejection.statusText;
                }

                $timeout(function() {
                    if (flashMessageTitle) {
                        flashMessage.error(flashMessageTitle, flashMessageOptions);
                    }
                });

                if (customInterceptor && angular.isFunction(customInterceptor.responseError) && !(customInterceptor instanceof ApiResourceInterceptor)) {
                    return customInterceptor.responseError(error, rejection);
                }

                return $q.reject(error);
            };
        };
    });
});
