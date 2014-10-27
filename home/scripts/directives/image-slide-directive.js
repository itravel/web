(function () {
    'use strict';

    angular.module('maizi')
        .directive('imageSlide', imageSlide);

    function imageSlide() {
        return {
            restrict: 'EA',
            compile: function (element) {
                var lastIndex = 0;
                var index = 1;

                function slide() {
                    //console.log(index);
                    var lis = element.find('li');
                    var liCount = lis.length;

                    if (index < liCount) {
                        var lastImage = angular.element(lis[lastIndex]);
                        var image = angular.element(lis[index]);

                        (function (lastImage, image) {
                            image.addClass('next');
                            lastImage.animate({
                                opacity: 0
                            }, 1000, function () {

                                lastImage.removeClass('active');
                                //console.log(lastImage.css('z-index'));
                                lastImage.css('opacity', 1);

                                image.removeClass('next');
                                image.addClass('active');
                                //console.log(lastImage.css('z-index'));

                            });
                        })(lastImage, image);

                        lastIndex = ++lastIndex % liCount;
                        index = ++index % liCount;
                        //console.log('index:', lastIndex, index)
                    }
                    setTimeout(slide, 5000);
                }

                slide();
            }
        };
    }
})();
