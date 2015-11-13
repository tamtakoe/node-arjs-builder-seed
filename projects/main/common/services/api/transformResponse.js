define([

    'app'

], function(app) {
    "use strict";

    function isPlainObject(value) {
        if (!isObjectLike(value) || objToString.call(value) != objectTag || isHostObject(value)) {
            return false;
        }
        var proto = objectProto;
        if (typeof value.constructor == 'function') {
            proto = getPrototypeOf(value);
        }
        if (proto === null) {
            return true;
        }
        var Ctor = proto.constructor;
        return (typeof Ctor == 'function' &&
        Ctor instanceof Ctor && fnToString.call(Ctor) == objCtorString);
    }


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
