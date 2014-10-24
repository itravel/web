/**
 * Created by weiminw on 14/10/19.
 */
angular.module("home").controller("ListController",['$scope','$routeParams','ActivityService','AreaService',function($scope,$routeParams,ActivityService,AreaService){
    $scope.area ={};
    $scope.activities = [];
    AreaService.getCityByName($routeParams.cityName).then(function(data){
        console.log(data);
        $scope.area = data;

    });

    ActivityService.getByCity($routeParams.cityName).then(function(data){
        $scope.activities = data;
    });
    $scope.rate=3.5;
    $scope.getActivityContent = function(value){
        return value.substr(0,50)+"...";
    }
}])

