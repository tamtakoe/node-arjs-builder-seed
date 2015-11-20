define([

    'app'

], function(app) {
    "use strict";

    var analytics = window.project.config.analytics || {};

    if (analytics.google) {
        //Universal Analytics
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        //Google remarketing. Realy!???
        window.google_conversion_id = 123456789;
        window.google_custom_params = window.google_tag_params;
        window.google_remarketing_only = true;

        ga('create', 'UA-12345678-1');
        ga('require', 'displayfeatures');
        ga('require', 'ec');
    } else {
        window.ga = angular.noop;
    }

    function pathname(url) {
        var a = document.createElement('a');
        a.href = url;

        return a.pathname.replace(/\/$/,'');
    }

    app.service('googleUniversalAnalytics', function() {
        return {
            //https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference
            hit: function(url, referrer, params) {
                ga('set', 'referrer', referrer);
                ga('set', 'location', url);
                ga('send', 'pageview');
            },
            track: function(eventType, label, params) {
                var labelArray    = label.split('.');
                var eventCategory = window.project.name;
                var eventLabel;

                if (labelArray[1]) {
                    eventCategory = labelArray[0];
                    eventLabel    = labelArray.slice(1).join('.');
                } else {
                    eventLabel = labelArray[0];
                }

                params = angular.extend({
                    hitType:       'event',
                    eventCategory: eventCategory,
                    eventAction:   eventType,
                    eventLabel:    eventLabel
                }, params);

                ga('send', params);
            },
            exec: function() {
                ga.apply(ga, arguments);
            }
        };
    });
});