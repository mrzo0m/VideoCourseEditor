/**
 * Created by mr.zoom on 14.03.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.core')
        .factory('backendservice', backendservice);
    backendservice.$inject = ['$httpBackend'];
    /* @ngInject */
    function backendservice($httpBackend) {
        var service = {
            backend: backend
        };

        return service;

        function backend() {
            var currentUser;
            var userStore = [
                {userName: 'John', password: '123', age: 25, location: 'Florida', authenticated: true, accessToken: uuid()},
                {userName: 'Mark', password: '123', age: 25, location: 'Florida', authenticated: true},
                {userName: 'Tom', password: '123', age: 25, location: 'Florida', authenticated: true},
                {userName: 'Travice', password: '123', age: 25, location: 'Florida', authenticated: true},
                {userName: 'Philip', password: '123', age: 25, location: 'Florida', authenticated: true},
                {userName: 'Stephan', password: '123', age: 25, location: 'Florida', authenticated: true},
                {userName: 'Michael', password: '123', age: 25, location: 'Florida', authenticated: true},
                {userName: 'Elianor', password: '123', age: 25, location: 'Florida', authenticated: true}
            ];
            var courseStore = [
                {
                    id: '3ba382e8-42d2-c0b4-32a4-93acacdabe40',
                    title: 'Курс ' + getRndNumFromRange(),
                    duration: getRndNumFromRange(),
                    startDate: getRndDate(),
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Donec viverra lorem dictum, dignissim magna eu, tempor est. Phasellus tempus,' +
                    ' est a efficitur maximus, massa risus rhoncus erat, vitae aliquam nisi ante quis' +
                    ' tortor. Integer maximus ultrices dictum. Suspendisse potenti. Phasellus vitae orci ' +
                    'vel augue laoreet tincidunt. Quisque pretium, dolor sed finibus sagittis, est tellus ' +
                    'finibus ipsum, sit amet fermentum velit.',
                    authors: [{name: 'Иванов Иван'}, {name: 'Петров Ефим'}]
                },
                {
                    id: 'fb078909-e8c2-62e0-546b-db2dc8036d3b',
                    title: 'Курс ' + getRndNumFromRange(),
                    duration: getRndNumFromRange(),
                    startDate: getRndDate(),
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Donec viverra lorem dictum, dignissim magna eu, tempor est. Phasellus tempus,' +
                    ' est a efficitur maximus, massa risus rhoncus erat, vitae aliquam nisi ante quis' +
                    ' tortor. Integer maximus ultrices dictum. Suspendisse potenti. Phasellus vitae orci ' +
                    'vel augue laoreet tincidunt. Quisque pretium, dolor sed finibus sagittis, est tellus ' +
                    'finibus ipsum, sit amet fermentum velit.',
                    authors: [{name: 'Сидоров Семён'}, {name: 'Максимов Ефим'}]
                },
                {
                    id: 'da8378d6-ed50-2d64-147d-222e3d00fe79',
                    title: 'Курс ' + getRndNumFromRange(),
                    duration: 2000,
                    startDate: getRndDate(),
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Donec viverra lorem dictum, dignissim magna eu, tempor est. Phasellus tempus,' +
                    ' est a efficitur maximus, massa risus rhoncus erat, vitae aliquam nisi ante quis' +
                    ' tortor. Integer maximus ultrices dictum. Suspendisse potenti. Phasellus vitae orci ' +
                    'vel augue laoreet tincidunt. Quisque pretium, dolor sed finibus sagittis, est tellus ' +
                    'finibus ipsum, sit amet fermentum velit.',
                    authors: [{name: 'Антонов Антон'}, {name: 'Иванов Иван'}, {name: 'Петров Ефим'}]
                }
            ];
            $httpBackend.whenPOST('/api/login').respond(function (method, url, data, headers) {
                console.log('Received these data:', method, url, data, headers);
                var userCredetials = angular.fromJson(data);
                var isAuthenticated = false;
                var accessToken;
                _.each(userStore, function (userInfo) {
                    if (userInfo.userName === userCredetials.userName &&
                        userInfo.password === userCredetials.password) {
                        isAuthenticated = true;
                        accessToken = userInfo.accessToken;
                    }
                }, this);
                userCredetials.authenticated = isAuthenticated;
                userCredetials.accessToken = accessToken;
                currentUser = userCredetials;
                if (isAuthenticated) {
                    return [200, userCredetials, {}]
                }
                return [401, userCredetials, {}];
            });
            $httpBackend.whenPOST('/api/logout').respond(function (method, url, data, headers) {
                console.log('Received these data:', method, url, data, headers);
                currentUser = null;
                var isAuthenticated = false;
                return [200, {}, {}];
            });
            //REST api

            //GET users(authors) list
            $httpBackend.whenGET('/api/authors').respond(function (method, url, data, headers) {
                console.log('Received these data:', method, url, data);
                if (angular.isDefined(headers['Authorization']) && headers['Authorization'] == currentUser.accessToken) {
                    var authorsName = _.pluck(userStore, 'userName');
                    return [200, _.map(authorsName, function (name) {
                        return {name: name};
                    }), {}];
                }
                return [401, {}, {}];
            });

            //GET courses list
            $httpBackend.whenGET('/api/courses').respond(function (method, url, data, headers) {
                console.log('Received these data:', method, url, data);
                if (angular.isDefined(headers['Authorization']) && headers['Authorization'] == currentUser.accessToken) {
                    return [200, courseStore, {}];
                }
                return [401, {}, {}];
            });

            //Create course
            $httpBackend.whenPOST('/api/courses').respond(function (method, url, data, headers) {
                console.log('Received these data:', method, url, data, headers);
                if (angular.isDefined(headers['Authorization']) && headers['Authorization'] == currentUser.accessToken) {
                    var course = angular.fromJson(data);
                    course.id = uuid();
                    courseStore.push(course);
                    return [200, course, {}];
                }
                return [401, {}, {}];
            });
            //Returns single course
            $httpBackend.whenGET(/api\/courses\/(\w+-)+(\w+)/).respond(function (method, url, data, headers) {
                console.log('Received these data:', method, url);
                if (angular.isDefined(headers['Authorization']) && headers['Authorization'] == currentUser.accessToken) {
                    var re = /\/api\/courses\//;
                    var id = url.replace(re, '');
                    var course = _.findWhere(courseStore, {id: id});
                    return [200, course, {}];
                }
                return [401, {}, {}];
            });
            //Delete single course
            $httpBackend.whenDELETE(/api\/courses\/(\w+-)+(\w+)/).respond(function (method, url, data, headers) {
                console.log('Received these data:', method, url, data, headers);
                if (angular.isDefined(headers['Authorization']) && headers['Authorization'] == currentUser.accessToken) {
                    var re = /\/api\/courses\//;
                    var id = url.replace(re, '');
                    var originalCourse = _.findWhere(courseStore, {id: id});
                    courseStore.splice(courseStore.indexOf(originalCourse), 1);
                    return [200, originalCourse, {}];
                }
                return [401, {}, {}];
            });
            //Update single course by put
            $httpBackend.whenPUT(/api\/courses\/(\w+-)+(\w+)/).respond(function (method, url, data, headers) {
                console.log('Received these data:', method, url, data, headers);
                if (angular.isDefined(headers['Authorization']) && headers['Authorization'] == currentUser.accessToken) {
                    var course = angular.fromJson(data);
                    var originalCourse = _.findWhere(courseStore, {id: course.id});
                    if (originalCourse) {
                        courseStore[courseStore.indexOf(originalCourse)] = _.clone(course);
                    }
                    return [200, course, {}];
                }
                return [401, {}, {}];
            });
            // dont mock everything else, specify pass through to avoid error.
            $httpBackend.whenGET(/^\w+.*/).passThrough();
            $httpBackend.whenPOST(/^\w+.*/).passThrough();
        }

        function getRndDate() {
            var date = new Date();
            date.setDate(date.getDate() + getRndNumFromRange());
            return date;
        }

        function getRndNumFromRange() {
            return Math.floor(Math.random() * 196) + 5; //5 - 200
        }

        function uuid() {
            function _p8(s) {
                var p = (Math.random().toString(16) + '000000000').substr(2, 8);
                return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
            }

            return _p8() + _p8(true) + _p8(true) + _p8();
        }
    }
})();
