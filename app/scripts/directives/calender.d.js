angular.module('app')
    .directive('calender', [function () {

        return {
            restrict: 'EA',
            scope: {
                date: '=date',
                month: '=month',
                activitiesGroup: '=activitiesGroup'
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
                    .on('afterrender', function (){
                        refreshHighlight();
                    })
                ;

                scope.$watch('activitiesGroup', function(){
                    refreshHighlight();
                }, true);

                var refreshHighlight = function () {
                    _.forEach(_.keys(scope.activitiesGroup), function(date) {
                        var elMaps = {};
                        element.find('.day').each(function() {
                            var el = $(this);
                            if (!el.hasClass('old') && !el.hasClass('new')) {
                                elMaps[el.find('.circle').html() - 0] = el;
                            }
                        })

                        if (date.slice(0, -3) == scope.month) {
                            elMaps[date.slice(-2) - 0].find('.marker').addClass('highlight');
                        }
                    });
                }

                scope.$on('prevMonth', function() {
                    element.find('.datepicker-days .prev').click();
                });

                scope.$on('nextMonth', function() {
                    element.find('.datepicker-days .next').click();
                });
            }
        };
    }]);