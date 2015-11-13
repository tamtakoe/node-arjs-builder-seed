define([

    'app',

    'angular'

], function(app) {
    "use strict";

    //replace line separators to <br> tag
    app.filter('nl2br', function($sce) {
        return function(msg) {
            var breakTag = '<br>';
            var msg = String(msg).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2'); //https://github.com/kvz/phpjs/blob/master/functions/strings/nl2br.js
            return $sce.trustAsHtml(msg);
        };
    });
});