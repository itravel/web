'use strict';

//document.addEventListener('deviceready', function() {
//    angular.bootstrap(document, ['app']);
//}, false);

angular.module('app', ['ngRoute', 'ngTouch', 'mobile-angular-ui']);

angular.module('app')
    .config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

        $routeProvider
            .when('/', {templateUrl: 'views/home.html', controller: 'HomeCtrl'})
            .when('/calender', {templateUrl: 'views/calender.html', controller: 'CalenderCtrl'})
            .when('/activities/:id', {templateUrl: 'views/activity.html', controller: 'ActivityCtrl'})
//            otherwise({templateUrl: 'views/main.html',   controller: 'MainCtrl'});

        $locationProvider.html5Mode(false);
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

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
