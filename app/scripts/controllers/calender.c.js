angular.module('app')
    .controller('CalenderCtrl', ['$scope', '$location', 'ActivityService',
        function ($scope, $location, ActivityService) {
            ActivityService.list().then(function (data) {
                $scope.activities = data;
                $scope.activitiesGroup = _.groupBy($scope.activities, function(activity) {
                    return moment(activity.startTime).format('YYYY-MM-DD');
                });
                console.debug('activities group: ', $scope.activitiesGroup);
            });

//        $scope.activities = [{
//            'id': 1,
//            'name': '国际火把狂欢节',
//            'start_time': '2014-05-10 08:00:00',
//            'end_time': '2014-05-10 08:00:00',
//            'location': '丽江',
//            'topics': ['当地特色', '民族风情'],
//            'price_adult': 100,
//            'price_child': 50,
//            'participation': '未知',
//            'activity_scale': 1000,
//            'sponsor': '丽江政府',
//            'images': ['images/demo/home1.jpg']
//        }];

            $scope.$watch('date', function(newDate, oldDate){
                $scope.selectedActivities = $scope.activitiesGroup[newDate];
                console.debug('selected activities: ', $scope.selectedActivities);
            });

            $scope.$watch('month', function(newMonth, oldMonth){
                // TODO: call ajax fetch month data

            });

            $scope.changeMonth = function (type) {
                $scope.$broadcast(type);
            }

            $scope.goToDetail = function (id) {
                $location.url('/activities/' + id);
            }
    }]);