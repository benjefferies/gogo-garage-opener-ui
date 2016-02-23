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

        function configure(configuration) {
            var oldConfiguration = getConfiguration();
            var configuration = {
                url: configuration.hasOwnProperty('url') ? configuration.url : oldConfiguration.url,
                port: configuration.hasOwnProperty('port') ? configuration.port : oldConfiguration.port,
                token: configuration.hasOwnProperty('token') ? configuration.token : oldConfiguration.token
            }
            $log.info("Saving configuration " + JSON.stringify(configuration))
            $localstorage.setObject('configuration', configuration)
        }

        function getConfiguration() {
            return $localstorage.getObject('configuration')
        }

        return {
            login: function(user) {
                $log.info("Logging in with " + JSON.stringify(user.email))
                var configuration = $localstorage.getObject('configuration')
                return $http.post(''.concat(configuration.url, ':', configuration.port, '/user/login'), user).then(function(response) {
                    if (response.status == 200) {
                        var token = response.headers('X-Auth-Token');
                        $http.defaults.headers.common['X-Auth-Token'] = token;
                        configuration.token = token;
                        configure(configuration)
                    }
                })
            },
            configure: configure,
            getConfiguration: getConfiguration,
            syncToken: function() {
                var configuration = $localstorage.getObject('configuration')
                $http.defaults.headers.common['X-Auth-Token'] = configuration.token;
            },
            isTokenSet: function() {
                var configuration = $localstorage.getObject('configuration')
                return $http.defaults.headers.common['X-Auth-Token'] == configuration.token && configuration.hasOwnProperty('token');
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
