(function () {
    'use strict';

    describe('Testing AngularJSCourseEditor module', function () {
        var appModule;

        beforeEach(function () {
            appModule = angular.module('app');
        });

        it('Test Start. Should be registered', function () {
            expect(appModule).toBeDefined();
        });
    });
})();
    