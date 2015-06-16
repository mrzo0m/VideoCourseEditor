(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('coursessrevice', coursessrevice);

    coursessrevice.$inject = ['$resource'];

    /* @ngInject */
    function coursessrevice($resource) {
        console.log('resource invoke');
        return $resource('/api/courses/:id', {id: '@id'},
            {create: {method: 'POST'}, save: {method: 'PUT'}});
    }
})();
