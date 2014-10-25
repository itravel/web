/**
 * Created by weiminw on 14/10/19.
 */

(function () {
    'use strict';

    angular
        .module('maizi')
        .controller('ListController', listController);

    listController.$inject = ['$scope', '$routeParams', 'ActivityService', 'AreaService'];
    function listController($scope, $routeParams, ActivityService, AreaService) {
        $scope.area = {};
        $scope.activities = [];
        AreaService.getCityByName($routeParams.cityName).then(function (data) {
            console.log(data);
            $scope.area = data;
        });

        ActivityService.getByCity($routeParams.cityName).then(function (data) {
            $scope.activities = data;
        });
        $scope.rate = 3.5;
        $scope.getActivityContent = function (value) {
            return value.substr(0, 50) + '...';
        }
    }
})();
