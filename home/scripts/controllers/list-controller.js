/**
 * Created by weiminw on 14/10/19.
 */
angular.module("home").controller("ListController",['$scope','$routeParams','ActivityService',function($scope,$routeParams,ActivityService){
    $scope.activities = [];
    ActivityService.getUneditDataPage(0,3).then(function(data){
        $scope.activities = data;
    })
    console.log("------")
}])