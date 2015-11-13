define([

    'app',

    'angular'

], function(app) {
    "use strict";

    app.filter('toFixedNumber', function() {
        return function(num, fractionDigits) {
            return Number(parseFloat(num).toFixed(fractionDigits));
        };
    });
});
