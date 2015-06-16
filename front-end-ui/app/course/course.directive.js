/**
 * Created by mr.zoom on 09.03.2015.
 */
/**
 * @desc course directive that can be used anywhere across the Video Courses app
 * @example <div epam-video-course></div>
 */
(function () {
    'use strict';
    angular
        .module('app.course')
        .directive('epamVideoCourse', videoCourse);
    function videoCourse() {
        var directive = {
            restrict: 'EA',
            templateUrl: 'app/feature/epam-video-course.html',
            scope: {
                courses: '=courses'
            },
            controller: 'CourseCtrl',
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }
})();
