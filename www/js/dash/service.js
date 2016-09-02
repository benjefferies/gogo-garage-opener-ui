angular.module('garage')
.factory('DashService', function($http, $log, UrlBuilder) {

    return {
        toggleGarage: function() {
            $log.info('Opening/Closing garage')
            return $http.post(UrlBuilder.build('/garage/toggle'), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        },
        getState: function() {
            $log.info('Getting garage state')
            return $http.get(UrlBuilder.build('/garage/state'))
        }
    }
})
