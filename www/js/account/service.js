angular.module('garage')
.factory('AccountService', function($http, $log, $localstorage) {

    function getConfiguration() {
        return $localstorage.getObject('configuration')
    }

    return {
        addTimes: function(times) {
            $log.info("Creating " + JSON.stringify(times))
            var configuration = getConfiguration();
            $http.post(configuration.url + ':' + configuration.port + '/user/times', times)
        },
        setConfiguration: function(configuration) {
            $localstorage.setObject('configuration', configuration)
        },
        getConfiguration: getConfiguration,
        syncToken: function() {
           var configuration = getConfiguration();
           $http.defaults.headers.common['X-Auth-Token'] = configuration.token;
        },
        isTokenSet: function() {
           var configuration = getConfiguration();
           return $http.defaults.headers.common['X-Auth-Token'] == configuration.token && configuration.hasOwnProperty('token');
        }
    };
})
