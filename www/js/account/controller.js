'use strict'
angular.module('garage')
.controller('AccountCtrl', function($scope, $ionicLoading, AccountService, $ionicModal) {
    $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    $scope.toggleDay = function(day) {
        if ($scope.modal.time.days.indexOf(day) != -1) {
            var index = $scope.modal.time.days.indexOf(day);
            $scope.modal.time.days.splice(index);
        } else {
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

    $scope.newTime = function() {
        var time = {
            days: []
        }
        time.timePickerObject = {
            inputEpochTime: ((new Date()).getHours() * 60 * 60), //Optional
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
            }
        }
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

    function setOpenTime(val) {}

    $scope.addGarage = function() {
        var times = [];
        angular.forEach($scope.times, function(time) {
            times.push({
                Days: time.days,
                OpenTime: time.openTime,
                Duration: time.duration
            })
        })
        AccountService.addTimes(times)
    }
});
