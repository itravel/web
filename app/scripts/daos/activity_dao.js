angular.module('app')
    .factory('ActivityDao', ['BaseHttp', function ($http) {

        return {
            list: function () {
                return $http({
                    method: 'GET',
                    url: '/services/activities'
                });
            },

            get: function (id) {
                return $http({
                    method: 'GET',
                    url: '/services/activities/' + id
                });
            }
        };
    }])
;