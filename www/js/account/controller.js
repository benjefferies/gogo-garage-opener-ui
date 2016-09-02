'use strict'
angular.module('garage')
.controller('AccountCtrl', function($scope, $ionicLoading, $ionicModal, AccountService, UrlBuilder, $log) {

    $scope.generatePin = function(time) {
        $log.debug("Generating pin")
        AccountService.generatePin().then(function(response) {
            $log.info("Generated pin " + response.data.pin)
            $scope.usePinUrl = UrlBuilder.build("/user/one-time-pin/" + response.data.pin)
        });
        $ionicModal.fromTemplateUrl('templates/generate-pin.html', {
            scope: $scope
        }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.time = time
            $scope.modal.show()
        });
    }
});
