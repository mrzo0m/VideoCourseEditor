'use strict';

angular.module('coursenseiApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
