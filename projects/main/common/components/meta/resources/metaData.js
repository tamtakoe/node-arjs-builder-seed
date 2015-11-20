define([

    'app'

], function(app) {
    'use strict';

    app.factory('MetaData', function(apiResource, metaDataResourceInterceptor, extendMeta, config) {

        var MetaData = apiResource('metadata/:id', {id: '@id'}, {
            get: {method: 'GET'},
            query: {method: 'GET', isArray: true},
            queryExtendedFormat: {method: 'GET', isArray: true, interceptor: metaDataResourceInterceptor, cache: true}
        });

        MetaData.getInExtendedFormat = function(params) { //get meta data for custom url
            var metaData = new MetaData();

            metaData.$promise = MetaData.queryExtendedFormat().$promise
                .then(function(data) {
                    return extendMetaData(data, params); //Why is not overwritten metaData.$promise?
                })
                .catch(function() {
                    var data = metaDataResourceInterceptor.response((config.meta || []).concat([]));

                    return extendMetaData(data, params); //Why is not overwritten metaData.$promise?
                });

            return metaData;
        };

        function extendMetaData(data, params) {
            var metaDataItem = {//set default values from root URL
                $data:   angular.copy(data[0].$params.root.$data),
                $params: data[0].$params
            };

            if (params.path) {//check current URL to match the patterns from the meta data collection
                for (var i = 0; i < data.length; i++) {
                    //pattern `/:foo?bar` + path with params `/hello?bar=world` -> params `{foo: 'hello', bar: 'world'}` or null if no matches
                    var urlParams = data[i].$urlMatcher.exec(params.path, params.search);

                    if (urlParams) {
                        angular.extend(metaDataItem.$params, data[i].$params);
                        metaDataItem.$params.url = urlParams;

                        extendMeta(metaDataItem.$data, data[i].$data);
                    }
                }
            }

            return angular.extend(MetaData, metaDataItem);
        }

        return MetaData;
    });
});