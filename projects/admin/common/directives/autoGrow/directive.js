define([

    'app'

], function(app) {
    "use strict";

    app.directive('appAutoGrow', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var nativeElement = angular.element(element).get(0);

                scope.$watch(attrs.ngModel, updateHeight);

                function updateHeight() {
                    if (nativeElement.scrollHeight <= nativeElement.clientHeight) {
                        nativeElement.style.height = '';
                    }
                    nativeElement.style.height = nativeElement.scrollHeight + "px";
                }
            }
        }
    });
});