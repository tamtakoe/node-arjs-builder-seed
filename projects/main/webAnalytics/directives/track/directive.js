define([

    'app'

], function(app) {
    "use strict";

    app.directive('appTrack', function($parse, $interpolate, webAnalytics) {
        return {
            restrict: 'A',
            compile:  function(element, attrs) {
                var labelFn   = $interpolate(attrs.appTrack || '');
                var eventFn   = $interpolate(attrs.appTrackEvent || 'click');
                var optionsFn = $interpolate(attrs.appTrackOptions || '');
                var disableFn = $parse(attrs.appTrackDisable || '');

                return function(scope, element) {
                    if (disableFn(scope)) {
                        return;
                    }

                    var eventType = eventFn(scope);
                    
                    element.on(eventType, function(event) {
                        webAnalytics.track(eventType, labelFn(scope), optionsFn(scope));
                    });
                };
            }
        };
    });
});