/**
 * Created by william.wangwm on 2014/10/24.
 */
angular.module('home')
    .factory('AreaDao',  ['BaseHttp','serviceUrl', function ($http,serviceUrl) {
        return {
            getCityByName:function(cityName){
                return $http({
                    method: 'GET',
                    url: serviceUrl.cities+'/'+cityName
                });
            }
        }
    }]);