/**
 * Created by william.wangwm on 2014/9/29.
 */
angular.module("home").controller("HomeController",['$scope','ActivityService',function($scope,ActivityService){
    $scope.activities = [];
    ActivityService.getUneditDataPage(0,6).then(function(data){
        $scope.activities = data;
    })

}])