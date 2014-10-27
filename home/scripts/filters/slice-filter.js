(function () {
    'use strict';

    angular.module('maizi')
        .filter('slice', slice);

    function slice(){
        return function (input, start, end) {
            return input.slice(start, end) + '...';
        };
    }

})();
