/**
 * Created by william.wangwm on 2014/9/29.
 */
angular.module("home").controller("HomeController",['$scope','ActivityService',function($scope,ActivityService){
    $scope.activities = [];
    ActivityService.getUneditDataPage(0,3).then(function(data){
        $scope.activities = data;
    })
    $scope.getImageThumbnail = function(activity){
        if(activity.images[0]){
            return activity.images[0]
        }
        else {
            return "images/1.png"
        }
    }

    $scope.myInterval = 3000;
    var slides = $scope.slides = [
        {
            image:"images/location_img-33-3081082103-88.jpg",
            text:"一段不平凡的旅程",
            slogon:"Learn More"
        },
        {
            image:"images/location_img-57-2457145156-88.jpg",
            text:"一生值得回忆的故事",
            slogon:"Be your want to be"
        },
        {
            image:"images/location_img-59-3756038896-88.jpg",
            text:"邂逅...",
            slogon:"Sign up"
        }
    ];

}])