define([

    'app',

    'main/common/components/meta/services/extendMeta',
    'main/common/components/meta/services/currentMeta',
    'main/common/components/meta/services/metaDataResourceInterceptor',

    'main/common/components/meta/resources/metaData'

], function(app) {
    "use strict";

    //initialize
    app.run(function($rootScope, currentMeta) {
        currentMeta.$get();

        $rootScope.$on('$locationChangeSuccess', function() {
            currentMeta.$get();
        });
    });
});