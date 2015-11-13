define([

    'app'

], function(app) {
    "use strict";

    app.filter('random', function() {
        return _.sample;
    });
});
