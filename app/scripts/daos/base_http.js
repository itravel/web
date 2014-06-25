angular.module('app')
    .factory('BaseHttp', ['$http', '$rootScope', function ($http, $rootScope) {
        return function(config){
            var httpPromise = $http(config);

//            httpPromise.error(function(){
//                $rootScope.$broadcast('error.http')
//            });

            return httpPromise;
        }
    }])
;