define([

    'app'

], function(app) {
    'use strict';

    app.controller('HomepageIndex', function($scope, Users) {
        $scope.users = Users.query();

        $scope.users.$promise.catch(function(error) {
            $scope.error = error;
        })
    });
});