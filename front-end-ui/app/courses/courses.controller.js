/**
 * Created by mr.zoom on 15.02.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.courses')
        .controller('CoursesCtrl', CoursesCtrl);

    CoursesCtrl.$inject = ['$scope', '$location', '$filter', 'coursessrevice'];

    function CoursesCtrl($scope, $location, $filter, coursessrevice) {
        var vm = this;
        vm.courses = [];
        vm.unfiltredCourses = [];
        vm.addCourse = addCourse;
        vm.search = search;
        vm.queryString = '';

        activate();

        function activate() {
            listCourses();
            vm.unfiltredCourses = angular.copy(vm.courses);
        }

        function listCourses() {
            vm.courses = coursessrevice.query();
            vm.courses.$promise.then(function (result) {
                vm.courses = angular.copy(result);
                vm.unfiltredCourses = angular.copy(vm.courses);
            });
        }

        function addCourse() {
            console.log('Add: ');
            $location.path('/courses/new');
        }

        function search() {
            if (!vm.queryString == '') {
                vm.courses = angular.copy(vm.unfiltredCourses);
                vm.courses = $filter('courseSearchFilter')(vm.queryString, vm.courses);
            }
        }
    }
})();
