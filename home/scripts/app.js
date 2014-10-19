/**
 * Created by william.wangwm on 2014/9/28.
 */
var homeModule = angular.module('home', ['ngRoute', 'ui.bootstrap', 'ui.bootstrap.carousel'])
homeModule.constant('serviceUrl', {
    activities: "/services/activities/",
    activityImages: "/services/images/activities",
    tag: "/services/tags",
    category: "/services/tags/categories",
    lvye: "/services/lvye_activity",
    lvyeUnedit: "/services/lvye_activity/unedit",
    lvyeLock: "/services/lvye_activity/lock",
    douban: "/services/douban",
    doubanUnedit: "/services/douban/unedit"


});
homeModule.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .when("/activity/:activityId",{
                templateUrl:"views/detail.html",
                controller:'DetailController'
            })
            .when("/city/:cityName",{
                templateUrl:"views/list.html",
                controller:'ListController'
            })

        ;

    }]);



