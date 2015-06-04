'use strict';

angular.module('videocourseeditorApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


