// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
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

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })
  .state('tab.account-add-days', {
        url: '/account-add-days',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-add-days.html',
            controller: 'AccountCtrl'
          }
        }
      })
  .state('tab.account-add', {
        url: '/account-add',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-add.html',
            controller: 'AccountCtrl'
          }
        }
      })
  .state('tab.account-configure', {
        url: '/account-configure',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-configure.html',
            controller: 'AccountCtrl'
          }
        }
      })
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

}).directive('time', function (dateFilter) {
      return {
          require:'ngModel',
          link:function (scope, elm, attrs, ctrl) {

              var dateFormat = attrs['time'] || 'HH:mm:ss';

              ctrl.$formatters.unshift(function (modelValue) {
                  return dateFilter(modelValue, dateFormat);
              });
          }
      };
  }).directive('integer', function(){
        return {
            require: 'ngModel',
            link: function(scope, ele, attr, ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    return parseInt(viewValue, 10);
                });
            }
        };
    }).constant('SERVER_DETAILS', {
      server_protocol: 'http',
      server_url: 'localhost',
      server_port: '8080'
    });
