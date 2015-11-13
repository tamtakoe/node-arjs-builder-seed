define([

    'app'

], function(app) {
    "use strict";

    var analytics = window.project.config.analytics || {};
    var imgElement;

    if (!window.project.internalUse && analytics.vkontakte) {
        imgElement = window.Image ? (new Image()) : document.createElement('img');
        imgElement.src = location.protocol + '//vk.com/rtrg?r=PVFRCrqh7a*i8ZkVFhn*QyF7y4f0lSEvK0p8iHhC0L63TVOgzKm/*ovCCRoueBjp3t6JKgeCIRMj6JlLSiIJIc/9LLtDkXYmTOJJgVhNliFl8W41iebzlmReZ2Msrxi/RsOToAHdjuWn9gYO8X0qOb5oV*wE7Y/MQEmurnE1Vbc-';
    }
});
