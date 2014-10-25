/**
 * Created by william.wangwm on 2014/10/24.
 */

(function () {
    'use strict';

    angular
        .module('maizi')
        .factory('AreaService', areaService);

    areaService.$inject = ['$q', 'AreaDao'];
    function areaService($q, AreaDao) {
        return {
            getCityByName: function (cityName) {
                var d = $q.defer();

                AreaDao.getCityByName(cityName).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    d.reject(data);
                });

                return d.promise;
            }
        }
    }
})();
