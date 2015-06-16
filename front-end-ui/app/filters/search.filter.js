/**
 * Created by mr.zoom on 15.03.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.courses')
        .filter('courseSearchFilter', courseSearchFilter);
    function courseSearchFilter() {
        return function (value, arr) {
            if (angular.isArray(arr) && arr.length && angular.isString(value)) {
                console.log('Search: ' + value);
                var data = [];
                angular.forEach(arr, function (item) {
                    if (item.title == value) {
                        if (item.title.toLowerCase().indexOf(value.toLowerCase()) != -1) {
                            data.push(item);
                        }
                    }
                });
                return data;
            } else {
                return value;
            }
        };
    }
})();
