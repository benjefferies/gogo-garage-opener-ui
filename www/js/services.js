angular.module('starter.services', [])

.factory('AccountService', function($http, $log, $localstorage) {

        return {
            addTimes: function(times) {
                $log.info("Creating " + JSON.stringify(times))
                var configuration = $localstorage.getObject('configuration')
                $http.post(configuration.url + ':' + configuration.port + '/user/times', times)
            },
            configure: function(configuration) {
                $localstorage.setObject('configuration', configuration)
            }
        };
    })
    .factory('UserService', function($http, $log, $localstorage, $rootScope) {

        return {
            login: function(user) {
                $log.info("Logging in with " + JSON.stringify(user.email))
                var configuration = $localstorage.getObject('configuration')
                return $http.post(configuration.url + ':' + configuration.port + '/user/login', user).then(function(response) {
                    $http.defaults.headers.common['X-Auth-Token'] = response.headers('X-Auth-Token');
                    if (response.status == 200) {
                        $rootScope.loggedInUser = user
                    }
                })
            },
            configure: function(registration) {
                $log.info("Saving configuration " + JSON.stringify(registration))
                $localstorage.setObject('configuration', registration)
            }
        }
    })
    .factory('GarageService', function($http, $log, $localstorage) {

        return {
            toggleGarage: function() {
                $log.info("Togging garage")
                var configuration = $localstorage.getObject('configuration')
                $http.post(configuration.url + ':' + configuration.port + '/garage/toggle', {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            },
            getState: function() {
                $log.info("Getting garage state")
                var configuration = $localstorage.getObject('configuration')
                return $http.get(configuration.url + ':' + configuration.port + '/garage/state')
            }
        }
    })
    .factory('$localstorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            }
        }
    }]);
