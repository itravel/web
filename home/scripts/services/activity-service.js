(function () {
    'use strict';

    angular
        .module('maizi')
        .factory('ActivityService', activityService);

    activityService.$inject = ['$q', 'ActivityDao', 'AreaDao'];
    function activityService($q, ActivityDao, AreaDao) {
        /*******************线上活动服务*************************/
        return {
            getUneditData: function (current) {
                var d = $q.defer();

                ActivityDao.list(current, 1).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    d.reject(data);
                });

                return d.promise;
            },
            getByCity: function (cityName) {
                var d = $q.defer();


                ActivityDao.list_by_city(cityName).success(function (data) {
//                console.log(ss);
                    d.resolve(data);
                }).error(function (data) {
                    d.reject(data);
                });

                return d.promise;
            },
            get: function (id) {
                var d = $q.defer();

                ActivityDao.get(id).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    d.reject(data);
                });

                return d.promise;
            },
            getUneditDataPage: function (current, number) {
                var d = $q.defer();

                ActivityDao.list(current, number).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    d.reject(data);
                });

                return d.promise;
            },
            startEdit: function (doubanId, editor) {
                var d = $q.defer();
                ActivityDao.update({'id': doubanId, 'editor': editor, 'status': 1}).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    alert(data);
                    d.reject(data);
                });

                return d.promise;

            },
            cancelEdit: function (doubanId, editor) {
                var d = $q.defer();
                ActivityDao.update({'id': doubanId, 'editor': editor, 'status': 0}).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    alert(data);
                    d.reject(data);
                });

                return d.promise;

            },
            save: function (activity) {
                var d = $q.defer();
                if (activity.id && activity.id > 0) {
                    ActivityDao.update(activity.id, activity).success(function (data) {
                        d.resolve(data);
                    }).error(function (data) {
                        d.reject(data);
                    });
                }
                else {
                    ActivityDao.create(activity).success(function (data) {
                        d.resolve(data);
                    }).error(function (data) {
                        d.reject(data);
                    });
                }

                return d.promise;
            },

            create: function () {
                var d = $q.defer();

                ActivityDao.create({}).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    d.reject(data);
                });


                return d.promise;
            },

            remove: function (activity) {
                var d = $q.defer();

                ActivityDao.delete(activity.id).success(function (data) {
                    d.resolve(data);
                }).error(function (data) {
                    d.reject(data);
                });


                return d.promise;
            }
        };
    }
})();
