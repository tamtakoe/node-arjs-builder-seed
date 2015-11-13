define([

    'app'

], function(app) {
    "use strict";

    app.factory('metaDataResourceInterceptor', function(config, $urlMatcherFactory, extendMeta) {
        return {
            response: function(data) { //convert response to extended format
                var i, urlMatches = [];
                var rootUrlData = data.find(function(item) { return item.url === '/' }) || {};

                setDefaultMeta(data, config.meta);

                //convert to extended format
                for (i = 0; i < data.length; i++) {
                    var meta = {
                        $data: data[i],
                        $urlMatcher: $urlMatcherFactory.compile(data[i].url),
                        $params: {
                            root: {
                                $data: rootUrlData
                            }
                        }
                    };

                    urlMatches.push(meta);
                }

                data.length = 0;
                data.push.apply(data, urlMatches);

                return data;
            }
        };

        function setDefaultMeta(dst, src) {
            src = angular.copy(src || []);

            var i, j;

            for (i = 0; i < dst.length; i++) {
                for (j = 0; j < src.length; j++) {
                    if (dst[i].url === src[j].url) {
                        extendMeta(dst[i], src[j]);
                        src.splice(j, 1);
                        break;
                    }
                }
            }

            dst.unshift.apply(dst, src);

            return dst;
        }
    });
});
