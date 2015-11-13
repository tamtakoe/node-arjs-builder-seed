define([

    'app'

], function(app) {
    "use strict";

    app.directive('appHeaderMenu', function($state) {
        return {
            restrict: 'E',
            templateUrl: '/main/common/directives/headerMenu/template.html',
            scope: true,
            link: function(scope) {
                scope.$state = $state;
            }
        }
    });
});