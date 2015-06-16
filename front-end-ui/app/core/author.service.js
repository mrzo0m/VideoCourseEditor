/**
 * Created by mr.zoom on 04.04.2015.
 */
(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authorsrevice', authorsrevice);

    authorsrevice.$inject = ['$resource'];

    /* @ngInject */
    function authorsrevice($resource) {
        console.log('resource invoke');
        return $resource('/api/authors');
    }
})();

