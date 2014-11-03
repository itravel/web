/**
 * 配合 http://eonasdan.github.io/bootstrap-datetimepicker 使用
 */
(function () {
    angular
        .module('datetimepicker', [])
        .directive('datetimepicker', function () {
            return {
                restrict: 'EA',
                scope: {},
                require: '?ngModel',
                link: function (scope, element, attrs, controller) {
                    var format = 'YYYY-MM-DD',
                        pickTime = false, inited = false;

                    if (attrs.datetype === 'datetime') {
                        format = 'YYYY-MM-DD HH:mm';
                        pickTime = true;
                    }
                    function setDate(val) {
                        if (!val || !inited) {
                            return;
                        }
                        //选中当前日期
                        $picker.datetimepicker("setValue", val);
                    }

                    controller.$render = function () {
                        var val = controller.$viewValue;
                        element.val(val);
                        setDate(val);
                    };

                    var config = {
                        language: 'zh-CN',
                        format: format,
                        pickTime: pickTime
                    };
                    if (attrs.fromnow) {
                        config.startDate = moment();
                    }
                    var $picker = $(element).datetimepicker(config).on('change.dp', function (ev) {
                        scope.$apply(function () {
                            var val = element.val();
                            controller.$setViewValue(val);
                        });
                    });
                    $picker.next().click(function () {
                        $(element).focus();
                    });
                    inited = true;
                }
            };
        });
})();
