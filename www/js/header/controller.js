'use strict'
angular.module('garage')
.controller('HeaderController', function($scope, $ionicModal, $ionicLoading, ConfigurationService, HeaderService, $ionicPopup) {

    $scope.configuration = ConfigurationService.getConfiguration();
    $scope.location = {}

    $ionicModal.fromTemplateUrl('templates/settings.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.configure = function() {
        ConfigurationService.setConfiguration($scope.configuration);
        if ($scope.location.hasOwnProperty('latitude') && $scope.location.hasOwnProperty('longitude')) {
            HeaderService.setLocation($scope.location).catch(function(response) {
                alert = {}
                if (response.status === 401) {
                    alert.title = 'Not authorised',
                    alert.template = 'Please log in before setting garage location'
                } else {
                    alert.title = 'Error code: '.concat(response.status),
                    alert.template ='Could not set garage location'
                }
                var popup = $ionicPopup.alert(alert);
            });
        }
        $scope.modal.hide();
    }

    $scope.getLocation = function() {
            $ionicLoading.show({
                template: 'Loading...'
            })
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.location.latitude = position.coords.latitude
                $scope.location.longitude = position.coords.longitude
                $scope.latLon = position.coords.latitude + ',' + position.coords.longitude
                $ionicLoading.hide()
            });
        }

});
