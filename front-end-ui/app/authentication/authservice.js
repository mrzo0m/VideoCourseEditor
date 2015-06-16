/**
 * Created by mr.zoom on 16.02.2015.
 */
(function () {
    'use strict';

    angular
        .module('app.authentication')
        .factory('authservice', authservice);

    authservice.$inject = ['$http', '$q', 'localStorageService'];

    /* @ngInject */
    function authservice($http, $q, localStorageService) {
        var userInfo;
        var service = {
            login: login,
            logout: logout,
            getUserInfo: getUserInfo
        };
        init();

        return service;

        function login(userName, password) {
            var deferred = $q.defer();

            $http.post('/api/login', {userName: userName, password: password})
                .then(function (result) {
                    userInfo = {
                        userName: result.data.userName,
                        authenticated: result.data.authenticated,
                        accessToken: result.data.accessToken
                    };
                    localStorageService.set('userInfo', JSON.stringify(userInfo));
                    deferred.resolve(userInfo);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function logout() {
            var deferred = $q.defer();
            $http.post('/api/logout')
                .then(function (result) {
                    userInfo = null;
                    localStorageService.remove('userInfo');
                    deferred.resolve(result);
                }, function (error) {
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function getUserInfo() {
            return userInfo;
        }

        function init() {
            if (localStorageService.isSupported) {
                userInfo = localStorageService.get('userInfo');
            } else {
                console.log('Error: session storage not supported for current browser');
            }
        }
    }
})();
