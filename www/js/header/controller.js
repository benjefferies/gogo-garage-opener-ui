'use strict'
angular.module('garage')
.controller('HeaderController', function($scope, $ionicModal, AccountService) {

    $scope.configuration = AccountService.getConfiguration();

    $ionicModal.fromTemplateUrl('templates/settings.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.configure = function() {
        AccountService.setConfiguration($scope.configuration)
        $scope.modal.hide()
    }

});
