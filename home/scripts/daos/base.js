/**
 * Created by william.wangwm on 2014/9/29.
 */

(function () {
    'use strict';

    angular
        .module('maizi')
        .factory('BaseHttp', baseHttp);

    baseHttp.$inject = ['$http'];
    function baseHttp($http) {
        return function (config) {
            var httpPromise = $http(config);
            return httpPromise;
        }
    }
})();
