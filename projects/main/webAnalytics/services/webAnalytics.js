define([

    'app',

    'main/webAnalytics/services/plugins/googleUniversalAnalytics'

], function(app) {
    "use strict";

    var externalReferrer = document.referrer || undefined;
    var gaReferrer;

    function pathname(url) {
        var a = document.createElement('a');
        a.href = url;

        return a.pathname.replace(/\/$/,'');
    }

    app.service('webAnalytics', function(config, googleUniversalAnalytics) {
        return {
            //routing tracking. F.e. webAnalytics.hit('http://site.com/contacts', 'http://othersite.com')
            hit: function(url, referrer, params) {
                if (externalReferrer !== null) {
                    referrer = gaReferrer = externalReferrer;
                    externalReferrer = null;

                } else if ((pathname(url) || pathname(referrer)) && pathname(url) === pathname(referrer)) {
                    return; //ignore query params
                } else {
                    gaReferrer = undefined;
                }

                googleUniversalAnalytics.hit(url, gaReferrer, params);
            },
            //event tracking. F.e. webAnalytics.track('click', 'article.topBanner'). Label format: 'category.label'
            track: function(eventType, label, params) {
                googleUniversalAnalytics.track(eventType, label, params);
            }
        };
    });
});