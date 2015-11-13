define([

    'app',

    'angular'

], function(app, angular) {
    "use strict";

    app.filter('stripTags', function() {
        return function(text) {
            return angular.element("<div>").html(text).text();
        };
    });
});
