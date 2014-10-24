/**
 * Created by william.wangwm on 2014/10/24.
 */
angular.module('home').factory('AreaService',function($q,AreaDao){
    return {
        getCityByName:function(cityName){
            var d = $q.defer();

            AreaDao.getCityByName(cityName).success(function(data){
                d.resolve(data);
            }).error(function(data){
                d.reject(data);
            });

            return d.promise;
        }
    }
});