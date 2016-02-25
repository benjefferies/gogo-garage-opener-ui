angular.module('garage')
.factory('DashService', function($http, $log, AccountService) {

    return {
        toggleGarage: function() {
            $log.info("Togging garage")
            var configuration = AccountService.getConfiguration();
            $http.post(configuration.url + ':' + configuration.port + '/garage/toggle', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getState: function() {
            $log.info("Getting garage state")
            var configuration = AccountService.getConfiguration();
            return $http.get(configuration.url + ':' + configuration.port + '/garage/state')
        }
    }
})
