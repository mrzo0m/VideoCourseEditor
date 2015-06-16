/**
 * Created by Oleg_Burshinov on 17.04.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.authentication')
        .factory('authenticationInterceptor', authenticationInterceptor);

    authenticationInterceptor.$inject = ['$q', '$injector', '$location', 'localStorageService'];

    /* @ngInject */
    function authenticationInterceptor($q, $injector, $location, localStorageService) {
        var responseInterceptor = {
            response: function (response) {
                if (response.status === 401) {
                }

                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    console.log('Access denied (error 401), please login again');
                    $location.path('/login');
                }
                return $q.reject(rejection);
            },
            request: function (config) {
                var accessToken,
                    currentUser = $injector.get('authservice').getUserInfo();
                if (currentUser && currentUser.authenticated) {
                    accessToken = currentUser.accessToken;
                }
                if (accessToken) {
                    config.headers.Authorization  = accessToken;
                }
                return config;
            }
        };
        return responseInterceptor;
    }
})();