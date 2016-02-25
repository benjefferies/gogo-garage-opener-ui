'use strict'
angular.module('garage')
.directive('integer', function() {
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl) {
            ctrl.$parsers.unshift(function(viewValue) {
                return parseInt(viewValue, 10);
            });
        }
    };
})
