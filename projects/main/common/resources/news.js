define([

    'app',

    'main/common/services/api/resource'

], function(app) {
    'use strict';

    app.factory('News', function(apiResource) {

        var News = apiResource('news/:id', { id: '@id' }, {
            get: { method: 'GET', cache: true },
            query: { method: 'GET', isArray: true, cache: true },
            findOne: {
                url: 'news/find-one',
                method: 'GET',
                cache: true
            }
        });

        News.prototype.publish = function() {
            this.status = 'published';
            return this.$save();
        };

        News.prototype.unpublish = function() {
            this.status = 'hidden';
            return this.$save();
        };

        return News;
    });

});