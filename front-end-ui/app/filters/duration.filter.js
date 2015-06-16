/**
 * Created by mr.zoom on 15.03.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.courses')
        .filter('courseDurationFilter', courseDurationFilter);
    courseDurationFilter.$inject = ['TIME'];
    function courseDurationFilter(TIME) {
        return function (value) {
            if (angular.isNumber(value)) {
                var hours = Math.floor(value / TIME.MIN_IN_HOUR);
                var mitutes = value % 60;
                return (value < TIME.MIN_IN_HOUR) ? mitutes + ' мин' : hours + ' час ' + mitutes + ' мин';
            } else {
                return value;
            }
        };
    }
})();
