angular.module('app')
    .controller('ActivityCtrl', ['$scope', '$location', 'ActivityService',
        function ($scope, $location, ActivityService) {
            var params = $location.search(),
                id = params.id;

            ActivityService.get(id).then(function(data){
                $scope.activity = data;
            });
        }]);