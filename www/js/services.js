angular.module('starter.services', [])

.factory('AccountService', function($http, $log, SERVER_DETAILS) {

    return {
      addTimes: function(times) {
        $log.info("Creating " + JSON.stringify(times))
        $http.post(SERVER_DETAILS.server_protocol + '://' + SERVER_DETAILS.server_url + ':' + SERVER_DETAILS.server_port + '/user', times)
      }
    };
  });
