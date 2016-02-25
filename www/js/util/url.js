angular.module('garage')
.factory('UrlBuilder', ['ConfigurationService', function(ConfigurationService) {
    return {
        build: function(path) {
            var configuration = ConfigurationService.getConfiguration();
            return ''.concat(configuration.url, ':', configuration.port, path);
        }
    }
}]);
