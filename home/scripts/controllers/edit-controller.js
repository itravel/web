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
        console.log($routeParams);
        ActivityService.get($routeParams.activityId).then(function (data) {
            console.log(data);
            $scope.activity = data;
        });

    }
})();
