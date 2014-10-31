/**
 * Created by william.wangwm on 2014/9/30.
 */

(function () {
    'use strict';

    angular
        .module('maizi')
        .controller('EditController', editController);

    editController.$inject = ['$scope', '$routeParams', 'ActivityService'];
    function editController($scope, $routeParams, ActivityService) {

        ActivityService.get($routeParams.activityId).then(function (data) {

            $scope.activity = data;

        });

        $scope.show = function(i) {
            $scope.currentTab = i;
        };

        $scope.save = function(activity){
            ActivityService.save(activity);
        }
    }
})();
