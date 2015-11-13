define([

    'app'

], function(app) {
    "use strict";

    app.service('flashMessage', function() {
        return window.flashMessage;
    });

});