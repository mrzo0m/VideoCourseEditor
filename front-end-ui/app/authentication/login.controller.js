/**
 * Created by mr.zoom on 15.02.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.authentication')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$location', '$scope', '$window', '$timeout', 'authservice'];

    function LoginCtrl($location, $scope, $window, $timeout, authservice) {
        var vm = this;
        vm.showIcon = false;
        vm.userInfo = null;
        vm.authWarning = false;
        vm.loginPattern = new RegExp('^[a-zA-Z]+$');
        vm.passwordPattern = new RegExp('^[a-zA-Z0-9]+$');
        vm.login = login;
        vm.cancel = cancel;
        vm.isAuthWarning = isAuthWarning;
        init();

        function login() {
            vm.showIcon = true;
            $timeout(function () {
                authservice.login(vm.userName, vm.password)
                    .then(function (result) {
                        vm.userInfo = result;
                        $scope.$emit('authEvent', {userInfo: vm.userInfo});
                        vm.userName = (vm.userInfo.userName) ? vm.userInfo.userName : '';
                        $location.path('/courses');
                    }, function (error) {
                        vm.authWarning = true;
                        console.log(error);
                    }).finally(function () {
                        vm.showIcon = false;
                    });
            }, 1000);
        }

        function cancel() {
            vm.userName = '';
            vm.password = '';
        }
        function init() {
            vm.userInfo = authservice.getUserInfo();
            if (vm.userInfo && vm.userInfo.userName) {
                vm.userName = vm.userInfo.userName;
            }
        }
        function isAuthWarning() {
            if (vm.userInfo) {
                vm.authWarning = !vm.userInfo.authenticated;
            }
            return vm.authWarning;
        }
    }
})();
