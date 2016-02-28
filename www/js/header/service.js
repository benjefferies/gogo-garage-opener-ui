angular.module('garage')
.factory('HeaderService', ['$http', 'UrlBuilder', function($http, UrlBuilder) {

    return {
        setLocation: function(location) {
            return $http.post(UrlBuilder.build('/user/garage/'.concat(location.latitude,'/',location.longitude)), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }
}]);
