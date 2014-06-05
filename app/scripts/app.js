'use strict';

angular.module('app', ['ngRoute', 'ngTouch', 'mobile-angular-ui']);

angular.module('app')
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider
            .when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl'})
            .when('/calender', {templateUrl: 'views/calender.html', controller: 'CalenderCtrl'})
            .when('/activities/:id', {templateUrl: 'views/activity.html', controller: 'ActivityCtrl'})
//            otherwise({templateUrl: 'views/main.html',   controller: 'MainCtrl'});
    }]);

angular.module('app')
    .run(['$rootScope', function($rootScope) {
        $rootScope.$on("$routeChangeStart", function(){
            $rootScope.loading = true;
        });

        $rootScope.$on("$routeChangeSuccess", function(){
            $rootScope.loading = false;
        });
    }]);