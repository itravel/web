/**
 * Created by william.wangwm on 2014/9/28.
 */

(function () {
    'use strict';

    angular
        .module('maizi', ['ngRoute', 'ui.bootstrap', 'datetimepicker']);

    angular
        .module('maizi')
        .constant('serviceUrl', {
            activities: '/services/activities',
            activityImages: '/services/images/activities',
            tag: '/services/tags',
            category: '/services/tags/categories',
            lvye: '/services/lvye_activity',
            lvyeUnedit: '/services/lvye_activity/unedit',
            lvyeLock: '/services/lvye_activity/lock',
            douban: '/services/douban',
            doubanUnedit: '/services/douban/unedit',
            cities: '/services/cities'
        });

    angular
        .module('maizi')
        .config(['$routeProvider',
            function ($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'views/home.html',
                        controller: 'HomeController'
                    })
                    .when('/activity/:activityId', {
                        templateUrl: 'views/detail.html',
                        controller: 'DetailController'
                    })
                    .when('/city/:cityName', {
                        templateUrl: 'views/list.html',
                        controller: 'ListController'
                    })
                    .when('/activity/:activityId/edit',{
                        templateUrl:'views/edit.html',
                        controller:'EditController'
                    })
                    .when('/activity/:activityId/order',{
                        templateUrl:'views/order.html',
                        controller:'OrderController'
                    })
                ;
            }]);

    angular
        .module('maizi')
        .run(['$rootScope',
            function ($rootScope) {
                $rootScope.basePath = '/home/#/';
            }]);
})();
