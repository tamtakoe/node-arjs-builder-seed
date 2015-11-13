define([

    'app',

    'main/webAnalytics/directives/track/directive',

    'main/webAnalytics/services/webAnalytics'

], function(app) {

    app.run(function($rootScope, $q, $location, webAnalytics) {
        //TODO: if (phantom) return;

        $rootScope.$on('$locationChangeSuccess', function(event, toUrl, fromUrl) {
            webAnalytics.hit(toUrl, fromUrl);
        });
    });
});