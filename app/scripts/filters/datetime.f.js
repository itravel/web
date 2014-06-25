angular.module('app')
    .filter('datetimeFormat', function () {
        return function (timestamp, format) {
            return moment(timestamp).format(format);
        }
    })