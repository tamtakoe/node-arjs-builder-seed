define([

    'app'

], function(app) {
    "use strict";

    app.directive('appAdminHeader', function() {
        return {
            restrict: 'E',
            templateUrl: '/admin/common/directives/header/template.html'
        }
    });
});