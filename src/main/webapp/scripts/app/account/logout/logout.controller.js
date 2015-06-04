'use strict';

angular.module('videocourseeditorApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
