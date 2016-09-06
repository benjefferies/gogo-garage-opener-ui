'use strict'
angular.module('garage')
.controller('LoginCtrl', function($scope, UserService, ConfigurationService, $location, $ionicPopup, $log) {


    $scope.user = {}

    $scope.login = function() {
        UserService.login($scope.user).then(function() {
            $location.path('#/tab/dash')
        }, function(res) {
            var config = ConfigurationService.getConfiguration()
            var alert = {}
            if (!res || res.status == 0) {
                alert.title = 'Could not connect';
                alert.template = 'Have you configured the URL in the settings page?';
                $log.warn('Failed to connect to server')
            } else if (res.status == 400) {
                alert.title = 'Incorrect username or password';
                alert.template = 'Please retry with correct credentials';
                $log.warn('Failed to login with status [%s]', res.status)
            }
            var popup = $ionicPopup.alert(alert);
        })
    }

    function initialiseConfiguration() {
        if (!ConfigurationService.isConfigured()) {
            var alert = {}
            alert.title = 'Server settings';
            alert.template = 'Server settings are not configured';
            var popup = $ionicPopup.alert(alert);
        }
    }

    initialiseConfiguration()

})
