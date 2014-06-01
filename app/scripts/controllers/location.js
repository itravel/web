angular.module('app')
    .controller('LocationCtrl', ['$scope', function ($scope) {
        $scope.locations = ['丽江', '北京'];
        $scope.selectedLocation = $scope.locations[0];

        $scope.select = function(location) {
            $scope.selectedLocation = location;
        }
    }]);