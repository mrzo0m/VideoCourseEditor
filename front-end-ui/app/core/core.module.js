/**
 * Created by Oleg_Burshinov on 12.02.2015.
 */
(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngRoute',
            'ngResource',
            'ngMockE2E',
            'app.authentication'
        ]);
})();
