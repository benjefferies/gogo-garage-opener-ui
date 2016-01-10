'use strict'
angular.module('starter.controllers', ['ionic'])

.controller('DashCtrl', function($scope, GarageService) {

    $scope.toggleGarage = function() {
        GarageService.toggleGarage();
    }
})
.controller('LoginCtrl', function($scope, UserService, AccountService, $ionicModal, $ionicLoading, $location) {

    $scope.registration = {}
    $scope.registration.location = {}
    $scope.registration.configuration = {}

    $scope.user = {}

    $scope.login = function() {
        UserService.login($scope.user)
        $location.path('#/tab/dash')
    }


    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
      });

    $scope.register = function() {
        $scope.errors = []
        var registration = $scope.registration;
        if (!registration.configuration.url) {
            $scope.errors.push("Url must be set")
        }
        if (!registration.configuration.port) {
            $scope.errors.push("Port must be set")
        }
        if (!registration.email) {
            $scope.errors.push("Email must be set")
        }
        if (!registration.password || !registration.passwordConfirmation) {
            $scope.errors.push("Password must be set")
        }
        if (registration.password != registration.passwordConfirmation) {
            $scope.errors.push("Password must be match")
        }
        if ($scope.errors.length == 0) {
            AccountService.configure($scope.registration.configuration)
            var registration = {Email : $scope.registration.email,
              Password: $scope.registration.password,
              Latitude: $scope.registration.location.Latitude,
              Longitude: $scope.registration.location.Longitude
              }

            UserService.register(registration)
            $scope.modal.hide()
        }
    }

    $scope.getLocation = function() {
        $ionicLoading.show({
            template: 'Loading...'
        })
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.registration.location.Latitude = position.coords.latitude
            $scope.registration.location.Longitude = position.coords.longitude
            $scope.registration.latLon = position.coords.latitude + ',' + position.coords.longitude
            $ionicLoading.hide()
        });
    }
})

.controller('AccountCtrl', function($scope, $ionicLoading, AccountService, $ionicModal) {
    $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday", "Sunday"]

    $scope.toggleDay = function (day) {
       if($scope.modal.time.days.indexOf(day) != -1){
           var index = $scope.modal.time.days.indexOf(day);
           $scope.modal.time.days.splice(index);
       }
       else{
           $scope.modal.time.days.push(day);
       }
    }

    $scope.createAndShowModel = function(time) {
        $ionicModal.fromTemplateUrl('templates/account-add-days.html', {
            scope: $scope
          }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.time = time
            $scope.modal.show()
          });
    }

    $scope.times = []
    $scope.location = {}

    $scope.newTime = function () {
        var time = {days:[]}
        time.timePickerObject = { inputEpochTime: ((new Date()).getHours() * 60 * 60), //Optional
                                        step: 15, //Optional
                                        format: 12, //Optional
                                        titleLabel: '12-hour Format', //Optional
                                        setLabel: 'Set', //Optional
                                        closeLabel: 'Close', //Optional
                                        setButtonType: 'button-positive', //Optional
                                        closeButtonType: 'button-stable', //Optional
                                        callback: function(val) { //Mandatory
                                            time.epochTime = val * 1000;
                                            time.openTime = new Date(val * 1000);
                                        }}
        $scope.times.push(time)
    }

    $scope.getLocation = function() {
        $ionicLoading.show({
            template: 'Loading...'
        })
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.location.Latitude = position.coords.latitude
            $scope.location.Longitude = position.coords.longitude
            $scope.latLon = position.coords.latitude + ',' + position.coords.longitude
            $ionicLoading.hide()
        });
    }

    function setOpenTime(val) {
    }

    $scope.addGarage = function() {
        var times = [];
        angular.forEach($scope.times, function(time) {
            times.push({Days : time.days, OpenTime: time.openTime, Duration: time.duration})
        })
        AccountService.addTimes(times)
    }
});
