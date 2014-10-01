/**
 * Created by william.wangwm on 2014/9/30.
 */
angular.module("home").controller("DetailController",['$scope','$routeParams','ActivityService',function($scope,$routeParams,ActivityService){
    console.log($routeParams)
    ActivityService.get($routeParams.activityId).then(function(data){
        console.log(data)
        $scope.activity = data;
    });
    $scope.getTimelinePosition = function(index){
        console.log(index)
        return index%2 ==0 ?"pos-right clearfix":"pos-right clearfix"
    }
}])
