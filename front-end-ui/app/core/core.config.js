(function () {
    'use strict';
    angular
        .module('app.core').config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/login', {
                        title: 'Login',
                        templateUrl: 'app/partials/login.html',
                        controller: 'LoginCtrl',
                        controllerAs: 'vm'
                    }).
                    when('/courses', {
                        title: 'Courses',
                        templateUrl: 'app/partials/courses.html',
                        controller: 'CoursesCtrl', // in course directive
                        controllerAs: 'vm'
                    }).
                    when('/courses/:id', {
                        title: 'Course',
                        templateUrl: 'app/partials/course.html',
                        controller: 'CourseCtrl',
                        controllerAs: 'vm'
                    }).
                    otherwise({
                        redirectTo: '/courses'
                    });
            }])
        .config(['$httpProvider',
            function ($httpProvider) {
                $httpProvider.interceptors.push('authenticationInterceptor');
            }])
        .run(['$location', '$rootScope', function ($location, $rootScope) {
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
                if (current.$$route !== undefined) {
                    $rootScope.title = current.$$route.title;
                }
            });
            $rootScope.$on('$routeChangeSuccess', function (event, current, previous, eventObj) {
                console.log(event);
                console.log(current);
                console.log(previous);
                console.log(eventObj);
            });
            $rootScope.$on('$routeChangeError', function (event, current, previous, eventObj) {
                console.log('Error: ' + event);
                console.log('Error: ' + current);
                console.log('Error: ' + previous);
                console.log('Error: ' + eventObj);
            });
            $rootScope.$on('$routeChangeError', function (event, current, previous, eventObj) {
                if (eventObj.authenticated === false) {
                    $location.path('/login');
                } else if (eventObj.authenticated === true) {
                    $location.path('/courses');
                }
            });
        }]);
})();
