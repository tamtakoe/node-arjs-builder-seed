define([

    'app'

], function(app) {
    'use strict';

    app.factory('Users', function(apiResource) {
        return apiResource('users/:id', { id: '@id' }, {
            query: { url: 'users', method: 'GET', isArray: true, cache: true },
            get: { method: 'GET', cache: true }
        });
    });
});