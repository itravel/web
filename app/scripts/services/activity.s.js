angular.module('app')
    .factory('ActivityService', ['$q', 'ActivityDao', function ($q, ActivityDao) {

        return {
            list: function () {
                var d = $q.defer();

                ActivityDao.list().success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });

                return d.promise;
            },

            get: function (id) {
                var d = $q.defer();

                ActivityDao.get(id).success(function(data){
                    d.resolve(data);
                }).error(function(data){
                    d.reject(data);
                });

                return d.promise;

//                return $q.when(
//                    {
//                        "id": 1,
//                        "gmt_create": 1402329600000,
//                        "gmt_modified": 1402329600000,
//                        "title": "1",
//                        "abstractContent": "2014-06-10",
//                        "startTime": 1402329600000,
//                        "endTime": 1402329600000,
//                        "longitude": 1.0,
//                        "latitude": 1.0,
//                        "address": 'test address',
//                        "images": "1",
//                        "fee": 1,
//                        "tags": "tag1,tag2",
//                        "type": "1",
//                        "scale": 1,
//                        "interestingRate": 1,
//                        "popularity": 1,
//                        "convenience": 1
//                    }
//                );
            }
        };
    }])
;