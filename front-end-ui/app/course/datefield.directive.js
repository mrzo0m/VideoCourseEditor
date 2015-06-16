/**
 * Created by mr.zoom on 31.03.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.course')
        .directive('epamDateField', dateField);
    function dateField() {
        var directive = {
            restrict: 'EA',
            require: '?ngModel',
            replace: true,
            templateUrl: 'app/feature/epam-date-field.html',
            link: function (scope, el, attrs, ngModel) {
                ngModel = ngModel || scope.courseForm;
                scope.$watch('vm.startDateString', function (newValue, oldValue) {
                    if (!newValue) {
                        return;
                    }
                    var arr = String(newValue).split('');
                    var validMask = ['0', '0', '.', '0', '0', '.', '0', '0', '0', '0'];
                    var applayMask = _.rest(validMask, arr.length);
                    var inputWithMask = arr.concat(applayMask).join('');
                    isValid(inputWithMask) ? scope.vm.startDateString = newValue : scope.vm.startDateString = oldValue;
                });

                ngModel.$parsers.unshift(function (viewValue) {
                    ngModel.$setValidity('pattern', isValid(viewValue));
                    return viewValue;
                });

                ngModel.$formatters.unshift(function (modelValue) {
                    ngModel.$setValidity('pattern', isValid(modelValue));
                    return modelValue;
                });
            }
        };
        return directive;
    }

    function isValid(s) {
        return s && /(\d\d\.){2}\d\d\d\d/.test(s);
    }
})();
