define([

    'app',

    'main/common/components/prerender/services/prerender',
    'main/common/components/prerender/services/interceptor'

], function(app) {
    "use strict";

    app.config(function($httpProvider, prerenderProvider) {
        $httpProvider.interceptors.push('prerenderInterceptor');

        prerenderProvider.timeout(100);
    });
});