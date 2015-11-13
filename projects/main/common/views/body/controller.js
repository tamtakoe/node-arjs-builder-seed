define([

    'app'

], function(app) {
    'use strict';

    app.controller('CommonBody', function($scope, $rootScope, $stateData) {
        $scope.stateData = $stateData;

        $rootScope.$on('$stateChangeSuccess', function() { //todo: скролить вверх только там, где нужно? мб юзая autoscroll ?
            window.scrollTo(0, 0);
        });
    });

});