angular.module('starter.services', [])

.factory('AccountService', function($http, $log, $localstorage) {

    return {
      addTimes: function(times) {
        $log.info("Creating " + JSON.stringify(times))
        var configuration = $localstorage.getObject('configuration')
        $http.post(configuration.url + ':' + configuration.port + '/user', times)
      },
      configure: function (configuration) {
          $localstorage.setObject('configuration', configuration)
      }
    };
  })
.factory('UserService', function($http, $log, $localstorage, $rootScope) {

    return {
        login: function(user) {
            $log.info("Creating user " + JSON.stringify(user))
            var configuration = $localstorage.getObject('configuration')
            $rootScope.loggedInUser = user
            $http.post(configuration.url + ':' + configuration.port + '/user/login', user)
        },
        register: function(registration) {
            $log.info("Registering " + JSON.stringify(registration))
            var configuration = $localstorage.getObject('configuration')
            $http.post(configuration.url + ':' + configuration.port + '/user/register', registration)
    }
        }
})
.factory('GarageService', function($http, $log, $localstorage) {

    return {
        toggleGarage: function() {
            $log.info("Togging garage")
            var configuration = $localstorage.getObject('configuration')
            $http.post(configuration.url + ':' + configuration.port + '/garage/toggle', {headers: { 'Content-Type': 'application/json' }})
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