/**
 * Created by william.wangwm on 2014/9/29.
 */
angular.module('home')
    .factory('BaseHttp', ['$http', '$rootScope', function ($http, $rootScope) {
        return function(config){
            var httpPromise = $http(config);
            return httpPromise;
        }
    }])
;