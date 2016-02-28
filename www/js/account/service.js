angular.module('garage')
.factory('AccountService', function($http, $log, UrlBuilder) {

    return {
        addTimes: function(times) {
            $log.info("Creating " + JSON.stringify(times))
        }
    };
})
