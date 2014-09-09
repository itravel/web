var services = {
    activities: "/itravel/admin/services/activities/",
    tag: "/itravel/admin/services/tags/",
    category: "/itravel /admin/services/tags/categories/",
    lvye_activity: "/admin/services/lvye_activity"

};
var adminModule = angular.module('admin', ['ngRoute','ui.bootstrap','blueimp.fileupload','textAngular']);
adminModule.constant('serviceUrl',{
	activities: "/itravel/admin/services/activities/",
    tag: "/itravel/admin/services/tags",
    category: "/itravel/admin/services/tags/categories",
    lvye: "/itravel/admin/services/lvye_activity",
    lvyeUnedit: "/itravel/admin/services/lvye_activity/unedit",
    lvyeLock:"/itravel/admin/services/lvye_activity/lock",
    douban:"/itravel/admin/services/douban",
    doubanUnedit:"/itravel/admin/services/douban/unedit"
    	
	
});
adminModule.controller('ActivitiesCtrl',
function($scope, $http) {
    $scope.query_param = {
        "start": 0,
        "num": 1
    }
    $scope.activity = {
    		tags:[],
    		images:[]
    		
    };

    $http({
        method: 'GET',
        url: services.lvye_activity+"/unedit",
        params: $scope.query_param
    }).success(function(data) {
        $scope.lvye_activities = data;
    });
    
    $scope.save = function(activity) {
    	console.log(activity);
    	var newActivity = angular.copy(activity);
    	
    	newActivity.images = newActivity.images.join(",");
    	var selectedTags = [];
    	angular.forEach(activity.tags,function(tag){
    		console.log(tag.selected)
    		if(tag.selected===true){
    			selectedTags.push(tag.id);
    		}
    	})
    	
    	newActivity.tags = selectedTags.join(",");
        if (activity.id && activity.id > 0) {
            $http({
                method: 'PUT',
                url: services.lvye_activity + "/"+activity.lvyeId,
                data: $.param(newActivity),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).success(function() {
                
            });
        } else {
            $http({
                method: 'POST',
                url: services.lvye_activity + "/"+activity.lvyeId,
                data: $.param(newActivity),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

            }).success(function(data) {
            	alert("添加活动成功")
            	$scope.activity = {
                		tags:[],
                		images:[]
                		
                };
            });

        }
        
        
    };
   
   /* $scope.pre = function(){
    	$scope.query_param.start-=1;
    	if($scope.query_param.start<0){
    		$scope.query_param.start = 0;
    	}
    	$http({
            method: 'GET',
            url: services.lvye_activity+"/unedit",
            params: $scope.query_param
        }).success(function(data) {
            $scope.lvye_activities = data;
        });
    }
    $scope.next = function(){
    	$scope.query_param.start+=1;
    	$http({
            method: 'GET',
            url: services.lvye_activity+"/unedit",
            params: $scope.query_param
        }).success(function(data) {
            $scope.lvye_activities = data;
        });
    }*/
    
}).directive('bDatepicker',
function() {

    return {
        restrict: 'A',
        require: "ngModel",
        link: function(scope, element, attr, ngModelCtrl) {
            element.datepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                autoclose: true,
                todayBtn: 'linked',
                language: 'zh-CN'

            }).on('changeDate',
            function(e) {
                ngModelCtrl.$setViewValue(e.currentTarget.value);
                scope.$apply();
            });
            var component = element.siblings('[data-toggle="datepicker"]');
            if (component.length) {
                component.on('click',
                function() {});
            }
        }
    };
})

/*adminModule.controller('TagCtrl',
function($scope, $http) {
    $http.get(services.tag).success(function(data) {
        $scope.tags = data;
    });
    $http.get(services.category).success(function(data) {
        $scope.tagCategories = data;
    });
    $scope.save = function(tag) {
        if (!tag) {
            return
        }
        $http({
            method: 'POST',
            url: services.tag,
            data: $.param(tag),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).success(function(data) {
            $scope.tags.push(data);
        });

    };
    $scope.clean = function() {
        $scope.tag = null
    };
    $scope.saveCategory = function(tagCategory) {
        if (!tagCategory) {
            return
        }
        $http({
            method: 'POST',
            url: services.category,
            data: $.param(tagCategory),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }

        }).success(function(data) {
            console.log(data);
            $scope.tagCategories.push(data)
        });
    };
    $scope.cleanCategory = function() {
        $scope.tagCategory = null
    }

})*/

adminModule.config(['$routeProvider',
function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'views/activities_list.html',
        controller: 'ActivitiesCtrl'
    })
    .when('/tags', {
        templateUrl: 'views/tags_list.html',
        controller: 'TagCtrl'
    })
    .when('/lvye',{
    	templateUrl: 'views/lvye_activity_list.html',
        controller: 'LvyeActivitiesCtrl'
    	
    })
    .when('/douban',{
    	templateUrl: 'views/douban-activity-list.html',
    	controller: 'DoubanActivitiesCtrl'
    		
    });

}]);


