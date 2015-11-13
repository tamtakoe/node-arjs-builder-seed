define([

    'app'

], function(app) {
    "use strict";

    app.provider('prerender', function() {
        var delayInMs = 100;
        var pendingCounter = 0;
        var pendingTimeoutPromise;

        return {
            timeout: function(delay) {
                delayInMs = delay;
            },
            $get: function($timeout, $window) {
                return {
                    wait: function(label) {
                        pendingCounter++;
                    },
                    ready: function(label) {
                        pendingCounter--;

                        $timeout.cancel(pendingTimeoutPromise);

                        pendingTimeoutPromise = $timeout(function() {
                            if (pendingCounter <= 0) {
                                $window.prerenderReady = true;
                            }
                        }, delayInMs, false);
                    }
                };
            }
        };
    });
});
