/**
 * Created by mr.zoom on 26.04.2015.
 */
(function () {
    'use strict';
    describe('Courses controller tests', function () {

        // фаза Arrange
        var mockScope = {};
        var controller;

        beforeEach(angular.mock.module('app'));


        beforeEach(angular.mock.inject(function ($controller, $rootScope) {
            mockScope = $rootScope.$new();
            controller = $controller('CoursesCtrl', {
                $scope: mockScope
            });
        }));

        // Act and Assess
        it('Created new scope', function () {
            expect(mockScope).toBeDefined() ;
        });
        it('Controller defined', function () {
            expect(controller).toBeDefined();
        });

        it('Search', function () {
            var course = {
                    id: '3ba382e8-42d2-c0b4-32a4-93acacdabe40',
                    title: 'Курс 1',
                    duration: 20,
                    startDate: new Date(),
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Donec viverra lorem dictum, dignissim magna eu, tempor est. Phasellus tempus,' +
                    ' est a efficitur maximus, massa risus rhoncus erat, vitae aliquam nisi ante quis' +
                    ' tortor. Integer maximus ultrices dictum. Suspendisse potenti. Phasellus vitae orci ' +
                    'vel augue laoreet tincidunt. Quisque pretium, dolor sed finibus sagittis, est tellus ' +
                    'finibus ipsum, sit amet fermentum velit.',
                    authors: [{name: 'Иванов Иван'}, {name: 'Петров Ефим'}]
                }
            var course2 = {
                    id: '4ba382e8-42d2-c0b4-32a4-93acacdabe40',
                    title: 'Курс 2',
                    duration: 40,
                    startDate: new Date(),
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' +
                    ' Donec viverra lorem dictum, dignissim magna eu, tempor est. Phasellus tempus,' +
                    ' est a efficitur maximus, massa risus rhoncus erat, vitae aliquam nisi ante quis' +
                    ' tortor. Integer maximus ultrices dictum. Suspendisse potenti. Phasellus vitae orci ' +
                    'vel augue laoreet tincidunt. Quisque pretium, dolor sed finibus sagittis, est tellus ' +
                    'finibus ipsum, sit amet fermentum velit.',
                    authors: [{name: 'Иванов Иван'}, {name: 'Петров Ефим'}]
                }    


            controller.unfiltredCourses.push(course);
            expect(controller.unfiltredCourses[0]).toBeDefined();
            controller.unfiltredCourses.push(course2);
            controller.queryString = course.title;
            controller.search();
            expect(controller.courses[0]).toEqual(course);

        });

        
    });
})();