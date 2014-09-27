/**
 * Created by william.wangwm on 2014/9/22.
 */
angular.module('admin').controller(
    'ActivityController', ['$scope', '$modal', '$location', '$routeParams', 'AdminService', 'ActivityService', 'LvyeService', 'DoubanService', function ($scope, $modal, $location, $routeParams, AdminService, ActivityService, LvyeService, DoubanService) {
        $scope.totalItems = 0;
        $scope.lvyeTotalItems = 0;
        $scope.doubanTotalItems = 0;
        $scope.currentPage = 1;
        $scope.lvyeCurrentPage = 1;
        $scope.doubanCurrentPage = 1    ;

//        var myDropzone = new Dropzone("div#myId", {paramName:"images",url:"/",addRemoveLinks :true,error:function(file,response){
//            alert("上传图片失败");
//        }});
        /**
         * 活动分页
         */
        $scope.activityListPageChanged = function () {
            ActivityService.getUneditDataPage(($scope.currentPage - 1) * 5, 6).then(function (data) {
                $scope.totalItems += data.length;
                $scope.activities = data.slice(0,5);
            });

        }
        /**
         * 绿野分页
         */
        $scope.lvyeListPageChanged = function () {
            LvyeService.getUneditDataPage(($scope.lvyeCurrentPage - 1) * 5, 6).then(function (data) {
                $scope.lvyeTotalItems = ($scope.lvyeCurrentPage-1)*5 + data.length;
                $scope.lvyeActivities = data.slice(0,5);
            });

        }

        /**
         * 豆瓣分页
         */
        $scope.doubanListPageChanged = function () {

            DoubanService.getUneditDataPage(($scope.doubanCurrentPage - 1) * 5, 6).then(function (data) {
                $scope.doubanTotalItems = ($scope.doubanCurrentPage-1)*5 + data.length;
                $scope.doubanActivities = data.slice(0,5);
            });

        }
        // 初始化
        var init = function(){
            LvyeService.getUneditDataPage(0, 6).then(function (data) {
                $scope.lvyeTotalItems += data.length;
                $scope.lvyeActivities = data.slice(0,5);
            });

            DoubanService.getUneditDataPage(0, 6).then(function (data) {
                $scope.doubanTotalItems = data.length;
                $scope.doubanActivities = data.slice(0,5);
            })
            ActivityService.getUneditDataPage(0, 6).then(function (data) {
                $scope.totalItems += data.length;
                $scope.activities = data.slice(0, 5);
            });
        }
        init();
        /**
         * 监听绿野数据变化
         */
        $scope.$on("lvyeActivitiesChanged",function(d,data){
            $scope.lvyeListPageChanged();
        })

        /**
         * 监听豆瓣数据变化
         */
        $scope.$on("doubanActivitiesChanged",function(d,data){
            $scope.doubanListPageChanged();
        })

        /**
         * 活动编辑对话框
         * @param $scope
         * @param $modalInstance
         * @param activity
         * @constructor
         */
        var ModalInstanceCtrl = function ($scope, $modalInstance, activity) {
            console.log(angular.element(document));

            $scope.activity = activity;
            /**
             * 添加活动行程安排
             */
            $scope.addJourney = function () {
                newJourney = {title: "", image: "", content: ""};
                $scope.activity.journey.push(newJourney)
            }
            /**
             * 删除活动行程安排
             * @param index
             */
            $scope.removeJourney = function (index) {
                $scope.activity.journey.splice(index, 1);
            }
            /**
             * 保存编辑的活动数据
             */
            $scope.save = function (activity) {
                console.log(activity);
//                $modalInstance.close($scope.selected.item);
            };
            /**
             * 放弃保存
             */
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };


        $scope.createActivityByLvye = function (lvye) {
            ActivityService.create().then(function (data) {
                modalInstance = $modal.open({
                    templateUrl: 'views/activity-form.html',
                    size: 'lg',
                    resolve: {
                        activity: function () {
                            return LvyeService.transform(lvye,data);
                        },
                        saveCallback:function(){
                            var callback = {};
                            callback.call = function(){
                                LvyeService.completedEdit(lvye.id,"");
                                $scope.$emit("lvyeActivitiesChanged",true);
                            }
                            return callback;
                        }
                    },
                    controller: 'ActivityEditCtrl'
                });
            })
        };

        $scope.createActivityByDouban = function (douban) {
            ActivityService.create().then(function (data) {
                modalInstance = $modal.open({
                    templateUrl: 'views/activity-form.html',
                    size: 'lg',
                    resolve: {
                        activity: function () {
                            console.log(douban);
                            return DoubanService.transform(douban,data);
                        },
                        saveCallback:function(){
                            var callback = {};
                            callback.call = function(){
                                DoubanService.completeEdit(douban.id,"");
                                $scope.$emit("doubanActivitiesChanged",true);
                            }
                            return callback;
                        }
                    },
                    controller: 'ActivityEditCtrl'

                });
            })
        };

        $scope.editeActivity = function (simpleActivity) {
            ActivityService.get(simpleActivity.id).then(function (data) {
                console.log(data)
                modalInstance = $modal.open({
                    templateUrl: 'views/activity-form.html',
                    size: 'lg',
                    resolve: {
                        activity: function () {
                            return data;
                        },
                        saveCallback:function(){
                            return {};
                        }
                    },
                    controller: 'ActivityEditCtrl',

                });
            });
        }

        $scope.addNewActivity = function(){
            ActivityService.create().then(function (data) {
                modalInstance = $modal.open({
                    templateUrl: 'views/activity-form.html',
                    size: 'lg',
                    resolve: {
                        activity: function () {
                            return data;
                        },
                        saveCallback:function(){
                            return {};
                        }
                    },
                    controller: 'ActivityEditCtrl',

                });
            })
        }
        $scope.remove = function(activity){
            ActivityService.remove(activity).then(function(data){
                $scope.activityListPageChanged();
            },function(data){
                console.log(data)
            });
        }


    }]
);