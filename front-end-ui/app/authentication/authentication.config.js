/**
 * Created by mr.zoom on 17.02.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.authentication')
        .config(function (localStorageServiceProvider) {
            localStorageServiceProvider
                .setStorageType('sessionStorage');
        })
        .run(init);

    init.$inject = ['backendservice'];
    function init(backendservice) {
        backendservice.backend();
    }
})();
