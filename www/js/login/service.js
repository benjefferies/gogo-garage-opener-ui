angular.module('garage')
  .factory('UserService', function($http, $log, AccountService, $rootScope) {

  return {
      login: function(user) {
          $log.info("Logging in with " + JSON.stringify(user.email))
          var configuration = AccountService.getConfiguration();
          return $http.post(''.concat(configuration.url, ':', configuration.port, '/user/login'), user).then(function(response) {
              if (response.status == 200) {
                  var token = response.headers('X-Auth-Token');
                  $http.defaults.headers.common['X-Auth-Token'] = token;
                  configuration.token = token;
                  AccountService.setConfiguration(configuration)
              }
          })
      }
  }
})
