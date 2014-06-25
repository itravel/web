angular.module('app')
    .factory('ActivityDao', ['BaseHttp', function ($http) {

        return {
            list: function () {
                return $http({
                    method: 'GET',
                    url: 'http://115.28.129.120/services/activities'
                });
            },

            get: function (id) {
                return $http({
                    method: 'GET',
                    url: 'http://115.28.129.120/services/activities/' + id
                });
            }
        };
    }])
;