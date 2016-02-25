'use strict'
angular.module('garage')
  .factory('UserService', function($http, $log, ConfigurationService, UrlBuilder, $rootScope) {

    function getToken() {
        return $localstorage.getObject('token')
    }

    return {
        login: function(user) {
            $log.info("Logging in with " + JSON.stringify(user.email))
            return $http.post(UrlBuilder.build('/user/login'), user).then(function(response) {
                if (response.status == 200) {
                    var token = response.headers('X-Auth-Token');
                    ConfigurationService.setToken(token)
                }
            })
        },
        syncToken: function() {
           var token = ConfigurationService.getToken();
           $http.defaults.headers.common['X-Auth-Token'] = token;
        },
        isTokenSet: function() {
           var configuration = ConfigurationService.getConfiguration();
           return $http.defaults.headers.common['X-Auth-Token'] == token && token != undefined && token != null;
        }
    }
})
