angular.module('garage')
.factory('AccountService', function($http, $log, UrlBuilder) {

    return {
        generatePin: function() {
            $log.info('Generating new one time pin')
            return $http.post(UrlBuilder.build('/user/one-time-pin'), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }
})
