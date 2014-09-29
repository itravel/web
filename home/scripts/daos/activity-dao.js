/**
 * Created by william.wangwm on 2014/9/29.
 */
angular.module('home')
    .factory('ActivityDao',  ['BaseHttp','serviceUrl', function ($http,serviceUrl) {

        return {
            list: function (offset,num) {
                return $http({
                    method: 'GET',
                    params:{'start':offset,'number':num},
                    url: serviceUrl.activities
                });
            },
            get: function (id) {
                return $http({
                    method: 'GET',
                    url: serviceUrl.activities+'/' + id
                });
            },
            create:function(data){
                return $http({
                    method: 'POST',
                    url: serviceUrl.activities,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'

                    }
                });
            },
            update:function(id,data){
                return $http({
                    method: 'PUT',
                    url: serviceUrl.activities+"/"+id,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json'

                    }
                });
            },
            delete:function(id) {
                return $http({
                    method: 'DELETE',
                    url: serviceUrl.activities + "/" + id,
                    headers: {
                        'Content-Type': 'application/json'

                    }
                });
            }
        };
    }]);
