'use strict';

angular.module('coursenseiApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


