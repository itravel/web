/**
 * Created by william.wangwm on 2014/10/24.
 */

(function () {
    'use strict';

    angular
        .module('maizi')
        .factory('AreaDao', areaDao);

    areaDao.$inject = ['BaseHttp', 'serviceUrl'];
    function areaDao($http, serviceUrl) {
        return {
            getCityByName: function (cityName) {
                return $http({
                    method: 'GET',
                    url: serviceUrl.cities + '/' + cityName
                });
            }
        }
    }
})();
