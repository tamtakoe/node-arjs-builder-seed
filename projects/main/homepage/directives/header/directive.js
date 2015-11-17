define([

    'app'

], function(app) {
    "use strict";

    app.directive('appHomepageHeader', function() {
        return {
            restrict: 'E',
            templateUrl: '/main/homepage/directives/header/template.html',
            scope: true,
            link: function(scope) {

            }
        }
    });
});