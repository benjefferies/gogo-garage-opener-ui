angular.module('garage')
.factory('ConfigurationService', ['$window', '$http', function($window, $http, UrlBuilder) {

    function syncToken() {
       var token = getToken();
       $http.defaults.headers.common['X-Auth-Token'] = token;
    }

    function getToken() {
        return $window.localStorage['token'];
    }

    return {
        setToken: function(value) {
            $window.localStorage['token'] = value;
            syncToken();
        },
        getToken: getToken,
        setConfiguration: function(value) {
            $window.localStorage['configuration'] = JSON.stringify(value);
        },
        getConfiguration: function() {
            return JSON.parse($window.localStorage['configuration'] || '{}');
        },
        syncToken: function() {
           var token = getToken();
           $http.defaults.headers.common['X-Auth-Token'] = token;
        },
        isTokenSet: function() {
           var token = getToken();
           return $http.defaults.headers.common['X-Auth-Token'] == token && token != null && token != undefined;
        }
    }
}]);
