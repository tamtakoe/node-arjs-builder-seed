define([

    'app'

], function(app) {
    "use strict";

    app.factory('UTCInterceptor', function($parse, $q, localDateToServerDate, serverDateToLocalDate) {

        return {
            response: function(response) {
                responseConfigHandler(response.config, response.data);
                return response;
            },
            responseError: function(responseError) {
                if (responseError.config) {
                    responseConfigHandler(responseError.config, responseError.config.data);
                }

                return $q.reject(responseError);
            },

            request: function(config) {
                var data   = _.cloneDeep(config.data);//TODO не уверен, что нужны копии.
                var params = _.cloneDeep(config.params);
                requestConfigHandler(config, data);
                requestConfigHandler(config, params);
                config.data = data;
                config.params = params;
                return config;
            }
        };

        function requestConfigHandler(config, data) {
            if (config.utcData) {
                _.forEach(config.utcData, function(fieldPath) {
                    var getter = $parse(fieldPath);
                    var setter = getter.assign;

                    var localDate = getter(data);
                    if (localDate) {
                        setter(data, localDateToServerDate(localDate));
                    }
                });
            }
        }

        function responseConfigHandler(config, data) {
            if (config.utcData) {
                _.forEach(config.utcData, function(fieldPath) {
                    var getter = $parse(fieldPath);
                    var setter = getter.assign;

                    var UTCDate = getter(data);
                    if (UTCDate) {
                        setter(data, serverDateToLocalDate(UTCDate));
                    }
                });
            }
        }
    });
});