define([

    'app'

], function(app) {
    "use strict";

    app.factory('extendMeta', function() {
        return function(dest, src) {
            dest = dest || {};
            src = src || {};
            dest.meta = dest.meta || [];

            var destMeta = [].concat(dest.meta);
            var srcMeta  = [].concat(src.meta || []);
            var keys     = Object.keys(src);
            var i, key;

            //extend fields. Empty string are ignored
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                dest[key] = src[key] || dest[key];
            }

            //extend meta
            destMeta.forEach(function(destMetaItem) {
                for (i = 0; i < srcMeta.length; i++) {
                    if (destMetaItem.name === srcMeta[i].name) {
                        return;
                    }
                }
                dest.meta.push(destMetaItem);
            });

            return dest;
        }
    });
});