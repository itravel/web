angular.module('app')
    .controller('HomeCtrl', ['$scope', '$location', 'ActivityService',
        function ($scope, $location, ActivityService) {
//        $scope.activities = [{
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

            ActivityService.list().then(function (data) {
                $scope.activities = data;
            });

            $scope.goToDetail = function (id) {
                $location.url('/activities/' + id);
            };
        }]);