(function () {
    'use strict';

    angular
        .module('app.core')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$location', '$scope', '$window', 'authservice'];

    function MainCtrl($location, $scope, $window, authservice) {
        var vm = this;
        vm.userInfo = null;
        vm.logout = logout;
        vm.breadcrumbsTitle = '';
        $scope.$on('authEvent', function (event, data) {
            vm.userInfo = data.userInfo;
        });
        $scope.$on('breadcrumbsEvent', function (event, data) {
            vm.breadcrumbsTitle = data.title;
        });
        
        init();

        function logout() {
            authservice.logout()
                .then(function () {
                    vm.userInfo = null;
                    $scope.$emit('authEvent', {userInfo: vm.userInfo});
                    $window.sessionStorage.clear();
                    $location.path('/login');
                }, function (error) {
                    console.log(error);
                });
        }

        function init() {
            vm.userInfo = authservice.getUserInfo();
        }
    }
})();
