/**
 * Created by mr.zoom on 25.03.2015.
 */
(function () {
    'use strict';
    angular
        .module('app.courses')
        .service('modalService', courseModal);
    courseModal.$inject = ['$modal'];
    function courseModal($modal) {

        var modalDefaults = {
            backdrop: true,
            keyboard: true,
            modalFade: true,
            templateUrl: 'app/feature/delete-course.html'
        };

        var modalOptions = {
            closeButtonText: 'Close',
            actionButtonText: 'OK',
            headerText: 'Proceed?',
            bodyText: 'Perform this action?'
        };

        this.showModal = function (customModalDefaults, customModalOptions) {
            if (!customModalDefaults) {
                customModalDefaults = {};
            }
            customModalDefaults.backdrop = 'static';
            return this.show(customModalDefaults, customModalOptions);
        };

        this.show = function (customModalDefaults, customModalOptions) {
            var tempModalDefaults = {};
            var tempModalOptions = {};

            angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

            angular.extend(tempModalOptions, modalOptions, customModalOptions);

            if (!tempModalDefaults.controller) {
                tempModalDefaults.controller = function ($scope, $modalInstance) {
                    $scope.modalOptions = tempModalOptions;
                    $scope.modalOptions.ok = function () {
                        $modalInstance.close();
                    };
                    $scope.modalOptions.close = function (result) {
                        $modalInstance.dismiss('cancel');
                    };
                };
                tempModalDefaults.controller.$inject = ['$scope', '$modalInstance'];
            }
            return $modal.open(tempModalDefaults).result;
        };
    }
})();
