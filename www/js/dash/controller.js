'use strict'
angular.module('garage')
.controller('DashCtrl', function($scope, DashService, $ionicPopup) {

    function getState() {
        DashService.getState().then(function(response) {
            $scope.garage = response.data
        }, function(response) {
            alert = {
              title: 'Error connecting',
              template: ''.concat(response.statusText, ', Message: ', response.data)
            }
            var popup = $ionicPopup.alert(alert);
        })
    }

    $scope.toggleGarage = function() {
        DashService.toggleGarage();
    }

    getState();
});
