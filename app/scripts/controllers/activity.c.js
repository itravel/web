angular.module('app')
    .controller('ActivityCtrl', ['$scope', '$location', '$routeParams', 'ActivityService',
        function ($scope, $location, $routeParams, ActivityService) {
            var id = $routeParams.id;

            ActivityService.get(id).then(function(data){
                $scope.activity = data;
            });
        }]);