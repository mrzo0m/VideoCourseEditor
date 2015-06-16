/**
 * Created by mr.zoom on 03.04.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.course')
        .directive('epamCourseDuration', courseDuration);
    function courseDuration() {
        var directive = {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/feature/epam-course-duration.html'
        };

        return directive;
    }
})();

