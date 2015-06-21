'use strict';

angular.module('coursenseiApp')
    .controller('CourseDetailController', function ($scope, $stateParams, Course) {
        $scope.course = {};
        $scope.load = function (id) {
            Course.get({id: id}, function(result) {
              $scope.course = result;
            });
        };
        $scope.load($stateParams.id);
    });
