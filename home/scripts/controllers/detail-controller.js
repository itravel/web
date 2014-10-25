/**
 * Created by william.wangwm on 2014/9/30.
 */

(function () {
    'use strict';

    angular
        .module('maizi')
        .controller('DetailController', detailController);

    detailController.$inject = ['$scope', '$routeParams', 'ActivityService'];
    function detailController($scope, $routeParams, ActivityService) {
        console.log($routeParams);
        ActivityService.get($routeParams.activityId).then(function (data) {
            console.log(data);
            $scope.activity = data;
        });
        $scope.getTimelinePosition = function (index) {
            console.log(index);
            return index % 2 == 0 ? 'pos-right clearfix' : 'pos-right clearfix';
        }
    }
})();
