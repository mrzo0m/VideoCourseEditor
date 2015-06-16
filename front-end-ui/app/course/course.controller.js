/**
 * Created by mr.zoom on 15.03.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.courses')
        .controller('CourseCtrl', CourseCtrl);

    CourseCtrl.$inject = ['$scope', '$location', '$routeParams', 'coursessrevice', 'modalService', 'authorsrevice'];

    function CourseCtrl($scope, $location, $routeParams, coursessrevice, modalService, authorsrevice) {
        var vm = this;
        vm.currentCourse = {};
        vm.currentCourse.authors = [];
        vm.startDateString = '';
        vm.courseAuthors = [];
        vm.deleteCourse = deleteCourse;
        vm.updateCourse = updateCourse;
        vm.titleChange = titleChange;

        $scope.$on('$routeChangeSuccess', function () {
            if ($location.path().indexOf('/courses/') == 0) {
                var id = $routeParams['id'];
                getCoursesAuthors();
                if (id !== 'new') {
                    getCurrentCourse(id);
                }
                if (vm.currentCourse.$promise) {
                    vm.currentCourse.$promise.then(function () {
                        titleChange();
                    });
                }
            }
        });

        function titleChange() {
            $scope.$emit('breadcrumbsEvent', vm.currentCourse);
        }

        function deleteCourse(course) {
            if (angular.isDefined(course.id)) {
                var modalOptions = {
                    closeButtonText: 'Отмена',
                    actionButtonText: 'Удалить курс',
                    headerText: 'Удалить курс \'' + course.title + '\'?',
                    course: course
                };
                modalService.showModal({}, modalOptions).then(function () {
                    course.$delete().then(function () {
                        vm.courses.splice(vm.courses.indexOf(course), 1);
                        $location.path('/courses');
                    }, processError);
                });
            } else {
                processError('Error: Wrong course state');
            }
        }

        function updateCourse(course) {
            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: 'app/feature/update-course.html'
            };
            var modalOptions = {
                actionButtonText: 'Ок',
                headerText: 'Ошибка ',
                message: 'Необходимо проверить корректность заполнения полей'
            };
            //TODO startDate form string
            if ($scope.courseForm.$valid && !$scope.courseForm.$pristine) {
                if (!course.id) {
                    course = coursessrevice.create(course);
                } else {
                    course.$save();
                }
                $location.path('/courses');
            } else {
                modalService.showModal(modalDefaults, modalOptions);
            }
        }

        function processError(error) {
            vm.errorMessage = error.message;
        }

        function getCoursesAuthors() {
            vm.courseAuthors = authorsrevice.query();
            if (vm.courseAuthors.$promise) {
                vm.courseAuthors.$promise.then(function (result) {
                    vm.courseAuthors = angular.copy(result);
                    console.log(result);
                }, processError);
            }
        }

        function getCurrentCourse(id) {
            vm.currentCourse = coursessrevice.get({id: id}, function () {
                _setStartDateForInputField();
            });
        }

        function _setStartDateForInputField() {
            if (angular.isDefined(vm.currentCourse.startDate)) {
                if (_.isDate(vm.currentCourse.startDate)) {
                    vm.startDateString = _getFormattedDate(vm.currentCourse.startDate);
                } else {
                    vm.currentCourse.startDate = new Date(vm.currentCourse.startDate);
                    vm.startDateString = _getFormattedDate(vm.currentCourse.startDate);
                }
            }
        }

        function _getFormattedDate(date) {
            var year = date.getFullYear();
            var month = (1 + date.getMonth()).toString();
            month = month.length > 1 ? month : '0' + month;
            var day = date.getDate().toString();
            day = day.length > 1 ? day : '0' + day;
            return day + '.' + month + '.' + year;
        }
    }
})();
