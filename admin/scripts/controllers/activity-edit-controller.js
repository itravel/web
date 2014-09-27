/**
 * Created by william.wangwm on 2014/9/25.
 */
angular.module("admin").controller("ActivityEditCtrl",['$scope','$modalInstance','activity','saveCallback','serviceUrl','ActivityService',function($scope, $modalInstance,activity,saveCallback,serviceUrl,ActivityService){
    $scope.activity = activity;
    $scope.alerts = [
    ];

    $scope.addAlert = function(meesage) {
        $scope.alerts.push({msg: meesage,type:'danger'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    /**
     * 添加活动行程安排
     */
    $scope.addJourney = function(){
        newJourney = {id:"",title:"",image:"",content:""};
        $scope.activity.journey.push(newJourney)
    }
    /**
     * 删除活动行程安排
     * @param index
     */
    $scope.removeJourney = function(index){
        $scope.activity.journey.splice(index ,1);
    }
    /**
     * 保存编辑的活动数据
     */
    $scope.save = function (activity) {
        if(saveCallback.call){
            saveCallback.call();
        }
        ActivityService.save(activity).then(function(data){
            $modalInstance.close();
        },function(data){
            $scope.addAlert(data)
        });
//
    };
    /**
     * 放弃保存
     */
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]).controller("ActivityImageCtrl",['$scope','serviceUrl',function($scope,serviceUrl){
    $scope.options = {
        url: serviceUrl.activityImages,
        autoUpload:true,
        paramName:'images'
    };

    $scope.$on('fileuploaddone',function(e,data){
        $scope.image = data.result.imageNames;
    });
    $scope.$on('fileuploadadd',function(file,xhr){
        $scope.queue.length = 0;

    });

    $scope.remove = function(index){
        $scope.queue.splice(index,1);
    };
}]).controller("ActivityJourneyImageCtrl",['$scope','serviceUrl',function($scope,serviceUrl){
    $scope.options = {
        url: serviceUrl.activityImages,
        autoUpload:true,
        paramName:'images',
        maxNumberOfFiles:1
    };

    $scope.$on('fileuploaddone',function(e,data){
        $scope.journey.image = data.result.imageNames;
    });

    $scope.$on('fileuploadadd',function(file,xhr){
        $scope.queue.length = 0;

    });
    $scope.remove = function(index){
        $scope.queue.splice(index,1);
    }


}]);