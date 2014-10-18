angular.module('home')
    .directive('imageSlide', [function () {

        return {
            restrict: 'EA',
//            scope: {
//                date: '=date'
//            },
            compile: function(element, attr) {
                var lastIndex = 0;
                var index = 1;
                function slide() {
                    console.log(index);
                    var lis = element.find('li');
                    var liCount = lis.length;

                    if (index < liCount) {
                        var lastImage = angular.element(lis[lastIndex]);
                        var image = angular.element(lis[index]);

                        //lastImage.css('z-index', -5);

                        (function(lastImage, image) {
                            image.addClass('next');
                            lastImage.animate({
                                opacity: 0
                            }, 1000, function() {

                                lastImage.removeClass('active');
                                console.log(lastImage.css('z-index'));
                                lastImage.css('opacity', 1);

                                image.removeClass('next');
                                image.addClass('active');
                                console.log(lastImage.css('z-index'));

                            });
                        })(lastImage, image);

                        lastIndex = ++lastIndex % liCount;
                        index = ++index % liCount;
                        console.log('index:', lastIndex, index)
                    }
                    setTimeout(slide, 5000);
                }

                slide();
            }
//            link: function (scope, element, attrs, controller) {
//                console.log(element)
//                var lis = element.find('li');
//                var liCount = lis.length;
//                var i = 0;
//                console.log(lis)
//                console.log(liCount)
//                function slide() {
//                    console.log('slide')
//                    i = i % liCount;
//                    angular.element(lis[i]).show();
//                    setInterval(slide, 5000);
//                }
//
//                slide();
//            }
        };
    }]);