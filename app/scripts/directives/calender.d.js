angular.module('app')
    .directive('calender', [function () {

        return {
            restrict: 'EA',
            scope: {
                date: '=date',
                month: '=month'
            },
            link: function (scope, element, attrs, controller) {
                element.datepicker({
                    language: 'zh-CN'
                });

                element.datepicker()
                    .on('changeDate', function (e) {
                        console.debug('datepicker param:', e);
                        scope.$apply(function() {
                            scope.date = moment(e.date).format('YYYY-MM-DD');
                            console.debug('selected date:', scope.date);
                        });
                    })
                    .on('changeMonth', function (e) {
                        console.debug('datepicker param:', e);
                        scope.$apply(function() {
                            scope.month = moment(e.date).format('YYYY-MM');
                            console.debug('selected month:', scope.month);
                        });
                    })
                ;

                scope.$on('prevMonth', function() {
                    element.find('.datepicker-days .prev').click();
                });

                scope.$on('nextMonth', function() {
                    element.find('.datepicker-days .next').click();
                });
            }
        };
    }]);