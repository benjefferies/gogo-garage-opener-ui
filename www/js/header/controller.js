'use strict'
angular.module('garage')
.controller('HeaderController', function($scope, $ionicModal, ConfigurationService) {

    $scope.configuration = ConfigurationService.getConfiguration();
    $scope.location = {}

    $ionicModal.fromTemplateUrl('templates/settings.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.configure = function() {
        ConfigurationService.setConfiguration($scope.configuration);
        $scope.modal.hide();
    }

});
