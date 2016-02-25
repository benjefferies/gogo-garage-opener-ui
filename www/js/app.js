
angular.module('garage', ['ionic', 'ionic-timepicker'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})
.run(function($rootScope, $location, $log, ConfigurationService) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState) {
        $log.info('State transition ['.concat(fromState.name, '] -> [' + toState.name, ']'))
        if (!ConfigurationService.isTokenSet()) {
            ConfigurationService.syncToken();
        }
        if (!ConfigurationService.isTokenSet() && toState.name !== 'login') {
            // Token not set, redirect to /login
            $location.path('/login');
        } else if (ConfigurationService.isTokenSet() && toState.name === 'login') {
            // Token now set, redirect to dash
            $location.path('/tab/dash');
        }
    })
})
.factory('authInterceptor', ['$log', '$location', '$q', function($log, $location, $q) {
    return {
        'responseError': function(rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
                return $q.reject(rejection);
            }
         }
    };
}])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);
