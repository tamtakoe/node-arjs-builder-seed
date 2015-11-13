define([

    'app'

], function(app) {
    "use strict";

    var analytics = window.project.config.analytics || {};
    var imgElement;

    if (!window.project.internalUse && analytics.mailru) {
        window._tmr = window._tmr || [];
        window._tmr.push({id: "2693344", type: "pageView", start: (new Date()).getTime()});

        (function (d, w, id) {
            if (d.getElementById(id)) return;

            var ts = d.createElement("script");
            ts.type = "text/javascript";
            ts.async = true;
            ts.id = id;
            ts.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//top-fwz1.mail.ru/js/code.js";

            var f = function () {var s = d.getElementsByTagName("script")[0]; s.parentNode.insertBefore(ts, s);};
            if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); }
        })(document, window, "topmailru-code");

        imgElement = window.Image ? (new Image()) : document.createElement('img');
        imgElement.src = '//top-fwz1.mail.ru/counter?id=2693344;js=na';
    }
});
