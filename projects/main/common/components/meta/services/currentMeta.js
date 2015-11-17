define([

    'app'

], function(app) {
    "use strict";

    app.factory('currentMeta', function($rootScope, $location, $interpolate, MetaData, extendMeta) {
        var rootInterpolationFunctions = {};
        var interpolationFunctions     = {};
        var currentMetaParams          = window.project.context = {}; //public params in window as a tip for the seo manager
        var currentMeta                = get();

        currentMeta.$addParams = addParams;
        currentMeta.$addMeta   = addMeta;
        currentMeta.$get       = get; //TODO rename to $load(?)
        currentMeta.$set       = set;

        $rootScope.$meta       = currentMeta;

        function get(path, queryParams) { //update meta by url
            var metaResource = MetaData.getInExtendedFormat({
                path:   path        || $location.path(),
                search: queryParams || $location.search()
            });

            metaResource.$promise
                .then(function(data) {
                    clear(currentMeta);
                    angular.extend(currentMeta, data);

                    setInterpolationFunctions(currentMeta.$params.root.$data, rootInterpolationFunctions);
                    copyPublic(currentMeta.$params, currentMetaParams);

                    setInterpolationFunctions(currentMeta.$data, interpolationFunctions);
                    update();
                });

            return metaResource;
        }

        //TODO: Use setter in custom field. See currentMode
        function set(data) { //compile fields from pattern and params
            clear(currentMeta);
            currentMeta.$data = data;

            setInterpolationFunctions(currentMeta.$data, interpolationFunctions);
            update();
        }

        function addMeta(meta) { //add meta tag
            extendMeta(currentMeta.$data, {meta: (meta instanceof Array) ? meta : [meta]});

            setInterpolationFunctions(currentMeta.$data, interpolationFunctions);
            update();
        }

        function update() { //update meta by meta fields
            setEvaluatedData(rootInterpolationFunctions, currentMetaParams.root, currentMetaParams);
            setEvaluatedData(interpolationFunctions, currentMeta, currentMetaParams);
        }

        function addParams(params) {
            currentMeta.$promise
                .then(function() {
                    copyPublic(params, currentMetaParams);

                    update();
                });
        }

        //copy except $private params and functions
        function copyPublic(src, dest) {
            if (src instanceof Array) {
                dest = dest || [];

                for (var i = 0; i < src.length; i++) {
                    dest[i] = copyValue(src[i]);
                }

            } else if (typeof src === 'object') {
                dest = dest || {};

                for (var key in src) {
                    if (src.hasOwnProperty(key) && key[0] !== '$') {
                        dest[key] = copyValue(src[key]);
                    }
                }
            }

            return dest;
        }

        function copyValue(value) {
            if (typeof value === 'object' && value !== null) {
                return copyPublic(value);

            } else if (typeof value !== 'function') {
                return value;
            }
        }

        function setInterpolationFunctions(src, dest) {
            angular.forEach(src, function(value, key) {
                if (key === 'meta') {
                    value = value || [];

                    dest[key] = value.map(function(meta) {
                        return {
                            name:      meta.name,
                            content:   $interpolate(String(meta.content || '')),
                            httpEquiv: $interpolate(String(meta.httpEquiv || ''))
                        };
                    });
                } else if (value) {
                    dest[key] = $interpolate(value);
                }
            });
        }

        function setEvaluatedData(src, dest, params) {
            angular.forEach(src, function(fn, key) {
                if (key === 'meta') {
                    fn = fn || [];

                    dest[key] = fn.map(function(meta) {
                        return {
                            name:      meta.name,
                            content:   meta.content(params),
                            httpEquiv: meta.httpEquiv(params)
                        };
                    });
                } else if (fn) {
                    dest[key] = fn(params);
                }
            });
        }

        function clear(obj) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key) && key[0] !== '$') {
                    delete obj[key];
                }
            }

            return obj;
        }

        return currentMeta;
    });
});
