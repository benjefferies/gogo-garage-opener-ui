'use strict'
angular.module('garage')
.controller('DashCtrl', function($scope, DashService, $ionicPopup) {

    function getState() {
        DashService.getState().then(function(response) {
            $scope.garage = response.data
        }, function(response) {
            var alert = {
              title: 'Error: '.concat(response.status),
              template: 'Could not load garage door status'
            }
            var popup = $ionicPopup.alert(alert);
        })
    }

    $scope.toggleGarage = function() {
        DashService.toggleGarage().catch(function(response) {
            var alert = {
              title: 'Error code: '.concat(response.status),
              template: 'Could not open/close garage'
            }
            var popup = $ionicPopup.alert(alert);
        })
    }

    getState();
});
