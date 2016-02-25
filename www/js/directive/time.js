'use strict'
angular.module('garage')
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
})
