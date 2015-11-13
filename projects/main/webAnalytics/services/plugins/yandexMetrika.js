define([

    'app'

], function(app) {
    "use strict";

    var analytics   = window.project.config.analytics || {};
    var yaCounterId = 24706115;
    var ym;

    if (!window.project.internalUse && analytics.yandex) {
        ym = CommandQueue({copy: angular.copy});

        require(['https://mc.yandex.ru/metrika/watch.js'], function() {
            var yaCounter = window['yaCounter' + yaCounterId] = new window.Ya.Metrika({
                id:                  yaCounterId,
                webvisor:            true,
                clickmap:            true,
                trackLinks:          true,
                accurateTrackBounce: true,
                ut: "noindex"
            });

            ym.init(yaCounter);
        });
    } else {
        ym = angular.noop;
    }

    app.service('yandexMetrika', function() {
        return {
            hit: function(url, referrer, params) {
                //https://help.yandex.ru/metrika/objects/hit.xml
                ym('hit', url, null, referrer, params);
            },
            track: function(eventType, label, params) {
                //https://help.yandex.ru/metrika/objects/reachgoal.xml
                ym('reachGoal', label + '.' + eventType, params);
            }
        };
    });
});