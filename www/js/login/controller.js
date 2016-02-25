'use strict'
angular.module('garage')
.controller('LoginCtrl', function($scope, UserService, AccountService, $ionicModal, $ionicLoading, $location, $ionicPopup, $log) {


    $scope.user = {}

    $scope.login = function() {
        UserService.login($scope.user).then(function() {
            $location.path('#/tab/dash')
        }, function(res) {
            var config = UserService.getConfiguration()
            var alert = {}
            switch (res.status) {
                case 0: alert.title = 'Could not connect!';
                        alert.template = 'Could not connect using '.concat(config.url, ':',config.port);
                        break;
                case 400: alert.title = 'Incorrect username or password';
                          alert.template = 'Please retry with correct credentials';
                          break;
            }
            var popup = $ionicPopup.alert(alert);
            $log.warn('Failed to login with status [%s]', res.status)
        })
    }

})
