/**
 * Created by weiminw on 14/10/19.
 */
angular.module("home").controller("ListController",['$scope','$routeParams','ActivityService',function($scope,$routeParams,ActivityService){
    $scope.activities = [];
    ActivityService.getUneditDataPage(0,10).then(function(data){
        $scope.activities = data;
    })
    $scope.rate=3.5;
    $scope.getActivityContent = function(value){
        return value.substr(0,50)+"...";
    }
}])