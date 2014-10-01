/**
 * Created by william.wangwm on 2014/9/30.
 */
angular.module("home").controller("DetailController",['$scope','ActivityService',function($scope,ActivityService){

    ActivityService.get(130).then(function(data){
        console.log(data)
        $scope.activity = data;
    });
    $scope.getTimelinePosition = function(index){
        console.log(index)
        return index%2 ==0 ?"pos-right clearfix":"pos-right clearfix"
    }
}])
