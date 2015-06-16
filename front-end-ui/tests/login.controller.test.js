/**
 * Created by mr.zoom on 26.04.2015.
 */
//expect(x).toEqual(val)         Asserts that x has the same value as val (but not necessarily the same object)
//expect(x).toBe(obj) Asserts that x and obj are the same object
//expect(x).toMatch(regexp)      Asserts that x matches the specified regular expression
//expect(x).toBeDefined()        Asserts that x has been defined
//expect(x).toBeUndefined()      Asserts that x has not been defined
//expect(x).toBeNull() Asserts that x is null
//expect(x).toBeTruthy()         Asserts that x is true or evaluates to true
//expect(x).toBeFalsy() Asserts that x is false or evaluates to false
//expect(x).toContain(y)         Asserts that x is a string that contains y
//expect(x).toBeGreaterThan(y)   Asserts that x is greater than y
//appModule = angular.module('app');
//authenticationModule = angular.module('app.authentication');
//coreModule = angular.module('app.core');
//courseModule = angular.module('app.course');
//coursesModule = angular.module('app.courses');
(function () {
    'use strict';
    describe('Login controller tests', function () {

        // фаза Arrange
        var mockScope = {};
        var controller;

        beforeEach(angular.mock.module('app'));


        beforeEach(angular.mock.inject(function ($controller, $rootScope) {
            mockScope = $rootScope.$new();
            controller = $controller('LoginCtrl', {
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

        it('UserInfo not added', function () {
            expect(controller.userInfo).toBeNull();
        });

        it('Login validator', function () {
            var userName = 'John';
            expect(userName).toMatch(controller.loginPattern); 
            userName = '31John';
            expect(userName).not.toMatch(controller.loginPattern); 
        });

        it('Password validator', function () {
            
            var password = '123';
            expect(password).toMatch(controller.passwordPattern); 
            password = '?Пароль';
            expect(password).not.toMatch(controller.passwordPattern); 
        });


//         accessToken: "61bf1ed9-594a-ec21-b4b0-7aefdc30613a"
// authenticated: true
// userName: "John"

    });
})();