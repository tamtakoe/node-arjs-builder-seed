define([

    'app'

], function(app) {
    "use strict";

    var analytics = window.project.config.analytics || {};
    var dataName = 'dataLayer';
    var dataLayer = [];

    if (!window.project.internalUse && analytics.googleTagManager) {
        window[dataName] = dataLayer;

        //Tag Manager
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script',dataName,'GTM-N3NTB6');
    } else {
        dataLayer.push = angular.noop;
    }

    function pathname(url) {
        var a = document.createElement('a');
        a.href = url;

        return a.pathname.replace(/\/$/,'');
    }

    app.service('googleTagManager', function() {
        return {
            hit: function(url, referrer, params) {
                dataLayer.push({
                    event:'GApageview',
                    page: pathname(url),
                    referrer: referrer
                });
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
                    event:'GAevent',
                    eventCategory: eventCategory,
                    eventAction:   eventType,
                    eventLabel:    eventLabel
                }, params);

                dataLayer.push(params);
            },
            push: function(data) {
                dataLayer.push(data);
            }
        };
    });
});