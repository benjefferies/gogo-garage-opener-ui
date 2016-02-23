
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-timepicker'])

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

.config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "templates/login.html",
                controller: 'LoginCtrl'
            })

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('dash', {
                parent: 'tab',
                url: '/dash',
                views: {
                    'tab-dash': {
                        templateUrl: 'templates/tab-dash.html',
                        controller: 'DashCtrl'
                    }
                }
            })
            .state('account', {
                parent: 'tab',
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('account-add', {
                parent: 'tab',
                url: '/account-add',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account-add.html',
                        controller: 'AccountCtrl'
                    }
                }
            })
            .state('account-add-days', {
                parent: 'tab',
                url: '/account-add-days',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/account-add-days.html',
                        controller: 'AccountCtrl'
                    }
                }
            });


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/dash');

    })
    .run(function($rootScope, $location, $log, UserService) {
        $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState) {
            $log.info('Changing path from' + fromState.name + ' to ' + toState.name)
            if (!UserService.isTokenSet()) {
                UserService.syncToken();
            }
            if (!UserService.isTokenSet() && toState.name !== "login") {
                // Token not set, redirect to /login
                $location.path("/login");
            } else if (UserService.isTokenSet() && toState.name === "login") {
                // Token now set, redirect to dash
                $location.path("/tab/dash");
            }
        })
    })
    .directive('time', function(dateFilter) {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {

                var dateFormat = attrs['time'] || 'HH:mm:ss';

                ctrl.$formatters.unshift(function(modelValue) {
                    return dateFilter(modelValue, dateFormat);
                });
            }
        };
    }).directive('integer', function() {
        return {
            require: 'ngModel',
            link: function(scope, ele, attr, ctrl) {
                ctrl.$parsers.unshift(function(viewValue) {
                    return parseInt(viewValue, 10);
                });
            }
        };
    })
