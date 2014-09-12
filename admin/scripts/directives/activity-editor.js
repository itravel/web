angular.module('admin').directive('ngActivityForm', ['AdminService','TagService', 'ActivityService','serviceUrl',
    function(AdminService,TagService,ActivityService,serviceUrl) {
	
	return {
		restrict : 'ACEM',
		templateUrl : 'views/activity-form.html',
		require : '^ngModel',
		scope : {
			ngModel : '=',
			activity:'&',
			url:'=',
			editable:'='
		},

		controller : function($scope, $element) {
            $scope.activity = {};
            var myDropzone = new Dropzone("div#myId", { url: serviceUrl.activityImages,addRemoveLinks :true,error:function(file,response){
                alert("上传图片失败");
            }});
            myDropzone.disable();

            myDropzone.on("success", function(data,xhr) {
                console.log(xhr.imageNames)
                $scope.activity.images.push(xhr.imageNames);
            });


			$scope.disabled = true;
            $scope.$watch('activity.editing',function(newValue,oldValue,scope){
               if(newValue === true){
                   myDropzone.enable();
               }
               else {
                   myDropzone.disable();
               }
            });
			$scope.$watch('ngModel',function(newVal,oldVal,scope){
				if(newVal){
					scope.activity = newVal;
                    myDropzone.removeAllFiles();
				}
				// 获取活动的TAG
				if($scope.TAGS){
					$scope.tags = angular.copy($scope.TAGS);
					if(scope.activity.tags){
						angular.forEach(scope.activity.tags,function(item){
							if($scope.tags[""+item.id]){
								$scope.tags[""+item.id].selected = true;
							}
						});
					}
				}
				else {
					TagService.getAll().then(function(data){
						$scope.TAGS=data;
						$scope.tags = angular.copy($scope.TAGS);
						if(scope.activity.tags){
							angular.forEach(scope.activity.tags,function(item){
								if($scope.tags[""+item.id]){
									$scope.tags[""+item.id].selected = true;
								}
							});
						}
					
					})
					
						
					
				}
				
			});
			$scope.isDisabled = function() {
				return !($scope.activity&&$scope.activity.editing===true);
			}
			$scope.$watchCollection('ngModel.images',function(){
			});
			$scope.clear = function() {
				$scope.ngModel = {};
			};
			// 保存到服务器
			$scope.save = function(activity) {
				
				var newActivity = angular.copy(activity);
//				newActivity.images = activity.images.join(",");
				var selectedTags = [];
				angular.forEach($scope.tags, function(tag) {

					if (tag.selected === true) {
						selectedTags.push({"id":tag.id,"tag":tag.tag});
					}
				});

				newActivity.tags = selectedTags;
				console.log(newActivity)
				ActivityService.save(newActivity).then(function(data){
					$scope.$emit("saveActivity",true);
					$scope.activity = data;
					$scope.message = {};
					$scope.message.success = true;
					$scope.message.fail = false;
					$scope.message.content = "保存成功"
					$element.find('#activityEditModal').modal("show");
				},function(data){
					$scope.message = {};
					$scope.message.success = false;
					$scope.message.fail = true;
					$scope.message.content = data;
					$scope.message.content = data;
					$element.find('#activityEditModal').modal("show");
				});

			};

		}

	}

} ]);