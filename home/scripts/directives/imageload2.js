/**
 * Created by william.wangwm on 2014/11/7.
 */
(function () {
    angular.module('maizi').directive('fileUpload', ['$timeout', function($timeout) {
        'use strict';
        return {
            template: '<span><input type="file" style="display:none" name="images"><button ng-click="clickUpload()" ng-transclude type="button" class="{{ buttonClass }}"></button></span>',
            restrict: 'E',
            transclude: true,
            scope: {
                buttonClass: '@class',
                change: '&change',
                accept: '@accept'
            },
            replace: true,
            controller: function($scope) {
                $scope.clickUpload = function() {
                    $scope.elements.input[0].click();
                };
            },
            compile: function(tElement, tAttrs, transclude) {
                return {
                    post: function(scope, iElement, iAttrs, controller) {

                        var children = iElement.children();

                        var input = angular.element(children[0]);
                        var button = angular.element(children[1]);

                        if (iAttrs.multiple == 'true') {
                            input.attr('multiple', 'multiple');
                        }

                        scope.elements = {
                            input: input,
                            button: button
                        };

                        // bind change event
                        input.bind('change', function($event) {
                            scope.$apply(function() {
                                scope.change({
                                    files: input[0].files,
                                    $event: $event
                                });
                            });
                        });

                        $timeout(function() {
                            iElement.removeAttr('class');
                        });
                    }
                };
            }
        };
    }]);

    angular.module('maizi').directive('imgUpload', ['$timeout', function($timeout) {
        'use strict';
        return {
            scope: {
                uploadTo: '@',
                height: '@imgHeight',
                accept: '@',
                buttonClass: '@',
                buttonText: '@',
                waitGif: '@',
                uploaded: '&',
                remove: '&',
                img: '=object'
            },
            replace: true,
            restrict: 'AE',
            templateUrl: 'scripts/directives/templates/img-upload.html',
            controller: ['$scope', function($scope) {
                $scope.submit = function($event) {
                    var formEl = $event.target.parentElement.parentElement;
                    var divEl = formEl.parentElement;
                    formEl.submit();
                    // show wait GIF, centered
                    $scope.imgDivStyle['background-image'] = 'url(' + $scope.waitGif + ')';
                    $scope.imgDivStyle['background-size'] = 'auto';
                };
                $scope.removeImg = function() {
                    $scope.remove({
                        img: $scope.img
                    });
                    delete $scope.imgDivStyle['background-image'];
                };
                $scope.iframeName = 'submit-frame-' + (new Date()).getTime() + (Math.random() * 100000 >>> 1);
            }],
            compile: function compile(tElement, tAttrs, transclude) {
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {
                        scope.imgDivStyle = {
                            'height': scope.height
                        };
                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        if (scope.img && scope.img.url) {
                            $timeout(function() {
                                scope.$apply(function() {
                                    scope.imgDivStyle['background-image'] = 'url(' + scope.img.url + ')';
                                    scope.imgDivStyle['background-size'] = 'cover';
                                });
                            });
                        }

                        // append iframe with a unique random name
                        var frame = angular.element('<iframe name="' + scope.iframeName + '" style="display:none"></iframe>');
                        iElement.append(frame);

                        function getStyle(node, name) {
                            return window.getComputedStyle(node, null).getPropertyValue(name);
                        }

                        scope.overlayStyle = function() {
                            if (!scope.show || !scope.img || !scope.img.imageNames) {

                                return {
                                    'display': 'none',
                                    'width': iElement[0].offsetWidth - (((+getStyle(iElement[0], 'padding-left').replace('px', '')) + (+getStyle(iElement[0], 'padding-right').replace('px', '')))) + 'px',
                                    'height': iElement[0].offsetHeight + 'px'
                                };
                            }
                            return {
                                'display': 'block',
                                'width': iElement[0].offsetWidth - (((+getStyle(iElement[0], 'padding-left').replace('px', '')) + (+getStyle(iElement[0], 'padding-right').replace('px', '')))) + 'px',
                                'height': iElement[0].offsetHeight + 'px'
                            };
                        };

                        // iframe would be loaded only after image is uploaded
                        frame.bind('load', function() {
                            iElement.find('input').val('');
                            var uploadedImg = angular.fromJson(angular.element(frame[0].contentDocument).contents().text());
                            $timeout(function() {
                                scope.$apply(function() {
                                    // set the background image to fit, and show uploaded image
                                    scope.imgDivStyle["background-image"] = 'url(' + "/services/images/activities/"+uploadedImg.imageNames + ')';
                                    scope.imgDivStyle["background-size"] = 'cover';
                                    scope.img = uploadedImg;
                                    if (scope.uploaded) {
                                        scope.uploaded({
                                            imgObject: uploadedImg
                                        });
                                    }
                                });
                            });
                        });
                    }
                };
            }
        };
    }]);

})();