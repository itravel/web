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
//        var myDropzone = new Dropzone("div#myId", { url: "/file/post"});
        ActivityService.get($routeParams.activityId).then(function (data) {
            $scope.activity = data;
        });
        $scope.options = {
            url: "/services/images/activities",
            paramName:"images",
            autoUpload:true
        };
        $scope.save = function(activity){
            var saveActivity = angular.copy(activity);
            saveActivity.destination = activity.destination.id;
            saveActivity.organizer = activity.organizer.id;
            ActivityService.save(saveActivity);
        }

    }
})();
