define([

    'app'

], function(app) {
    "use strict";

    app.directive('appPreloader', function() {
        return {
            restrict: 'AE',
            require: '?ngModel',
            compile: function(element, attrs) {
                element.addClass('preloader preloader_size_' + attrs.size);

                if (attrs.position) {
                    element.addClass('preloader_' + attrs.position);
                }

                if (attrs.color) {
                    element.addClass('preloader_' + attrs.color);
                }

                return function(scope, element, attrs, ctrl) {
                    //scope.$on(attrs.startEventName, elemShow); //TODO uncomment when need
                    //
                    //scope.$on(attrs.stopEventName, elemHide);
                    // TODO: Не очивидно
                    //if (attrs.appPreloader) {
                    //    elemShow();
                    //} else {
                    //    elemHide();
                    //}


                    //function elemShow() {
                    //    ctrl && ctrl.$setViewValue(true);
                    //    element.removeClass('ng-hide');
                    //}
                    //function elemHide() {
                    //    ctrl && ctrl.$setViewValue(false);
                    //    element.addClass('ng-hide')
                    //}

                    //scope.$watch(
                    //    function() {
                    //        return attrs.color;
                    //    },
                    //    function(val, oldVal) {
                    //        element
                    //            .removeClass('preloader_' + oldVal + attrs.size)
                    //            .addClass('preloader_' + val + attrs.size);
                    //    }
                    //);
                }
            }
        }
    });
});