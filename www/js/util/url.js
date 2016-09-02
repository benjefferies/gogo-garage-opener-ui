angular.module('garage')
.factory('UrlBuilder', ['ConfigurationService', function(ConfigurationService) {
    return {
        build: function(path) {
            var configuration = ConfigurationService.getConfiguration();
            var defaultHttp = configuration.url.startsWith('http://') && configuration.port === 80;
            var defaultHttps = configuration.url.startsWith('https://') && configuration.port === 443;
            var url
            if (defaultHttp || defaultHttps) {
                return ''.concat(configuration.url, path);
            } else {
                return ''.concat(configuration.url, ':', configuration.port, path);
            }
        }
    }
}]);
