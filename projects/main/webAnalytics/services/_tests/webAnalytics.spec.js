define([

    'app',

    'main/common/services/config',

    'main/webAnalytics/services/webAnalytics',

    'main/webAnalytics/services/plugins/googleUniversalAnalytics'

], function(app) {
    "use strict";

    describe('service: webAnalytics', function() {
        var webAnalytics;

        beforeEach(module('app')); //need angular-mocks
        beforeEach(inject(function($injector) {
            webAnalytics = $injector.get('webAnalytics');
        }));

        it('has hit and track methods', function() {
            expect(!!webAnalytics.hit).toEqual(true);
            expect(!!webAnalytics.track).toEqual(true);
        });
    });
});