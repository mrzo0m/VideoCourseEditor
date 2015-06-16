(function () {
    'use strict';
    angular
        .module('app.course')
        .directive('epamMultiSelect', multiSelect);
    multiSelect.$inject = ['$q'];
    function multiSelect($q) {
        var directive = {
            restrict: 'EA',
            require: '?ngModel',
            replace: true,
            scope: {
                selectedLabel: '@',
                availableLabel: '@',
                displayAttr: '@',
                available: '=',
                model: '=ngModel'
            },

            templateUrl: 'app/feature/epam-multi-select.html',
            link: function (scope, elm, attrs, ngModel) {
                scope.selected = {
                    available: [],
                    current: []
                };

                ngModel.$parsers.unshift(function (viewValue) {
                    ngModel.$setValidity('required', isValid(viewValue));
                    return viewValue;
                });

                ngModel.$formatters.unshift(function (modelValue) {
                    ngModel.$setValidity('required', isValid(modelValue));
                    return modelValue;
                });
                
                var isValid = function (val) {
                    return val && val.length > 0;
                };
                
                var dataLoading = function (scopeAttr) {
                    var loading = $q.defer();
                    if (scope[scopeAttr]) {
                        loading.resolve(scope[scopeAttr]);
                    } else {
                        scope.$watch(scopeAttr, function (newValue, oldValue) {
                            if (newValue !== undefined) loading.resolve(newValue);
                        });
                    }
                    return loading.promise;
                };

                var filterOut = function (original, toFilter) {
                    var filtered = [];
                    angular.forEach(original, function (entity) {
                        var match = false;
                        for (var i = 0; i < toFilter.length; i++) {
                            if (toFilter[i][attrs.displayAttr] == entity[attrs.displayAttr]) {
                                match = true;
                                break;
                            }
                        }
                        if (!match) {
                            filtered.push(entity);
                        }
                    });
                    return filtered;
                };

                scope.refreshAvailable = function () {
                    scope.available = filterOut(scope.available, scope.model);
                    scope.selected.available = [];
                    scope.selected.current = [];
                };

                scope.add = function () {
                    scope.model = scope.model.concat(scope.selected.available);
                    scope.refreshAvailable();
                };
                scope.remove = function () {
                    scope.available = scope.available.concat(scope.selected.current);
                    scope.model = filterOut(scope.model, scope.selected.current);
                    scope.refreshAvailable();
                };

                $q.all([dataLoading('model'), dataLoading('available')]).then(function (results) {
                    scope.refreshAvailable();
                });
            }
        };

        return directive;
    }
})();
