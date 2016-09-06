'use strict'
angular.module('garage')
.controller('DashCtrl', function($scope, DashService, $ionicPopup, $interval, $timeout, ConfigurationService, $log) {

    $scope.updateState = function() {
        DashService.getState().then(function(response) {
            $scope.garage = response.data
        }, function(response) {
            var alert = {
              title: 'Error: '.concat(response.status),
              template: 'Could not load garage door status'
            }
            var popup = $ionicPopup.alert(alert);
        }).finally(function() {
            // Stop the ion-refresher from spinning
            $scope.$broadcast('scroll.refreshComplete');
        });
    }
    function getGarageTimeout() {
        var config = ConfigurationService.getConfiguration()
        var timeout = config.garageTimeout == 0 || config.garageTimeout == null ? 60 : config.garageTimeout
    }

    function toggleGarage() {
        $log.info('Opening or closing garage')
        return DashService.toggleGarage().then(function(response) {
            var intervals = getGarageTimeout()/2
            $interval($scope.updateState, 1000, intervals)
        }).catch(function(response) {
            var alert = {
              title: 'Error code: '.concat(response.status),
              template: 'Could not open/close garage'
            }
            var popup = $ionicPopup.alert(alert);
        })
    }

    $scope.toggleGarage = function() {
        toggleGarage()
    }

    $scope.openAndCloseGarage = function() {
        $log.info('Opening and then closing garage')
        toggleGarage().then(function(response) {
            $timeout(function() {
                toggleGarage()
            }, getGarageTimeout())
        })
    }

    $scope.updateState();
});
