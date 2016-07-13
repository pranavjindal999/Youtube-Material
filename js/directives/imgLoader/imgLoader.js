(function(angular) {
    youtubeApp.directive('imgLoader', function() {
        return {
            restrict: 'E',
            scope: {
                src: '=imgSrc'
            },
            templateUrl: 'js/directives/imgLoader/imgLoader.html',
            link: function(scope, element, attr) {
                scope.loader = true;
                (angular.element(element.children()[1])).on('load', function(event) {
                    scope.$apply(scope.loader = false);
                });
            }
        };
    });
})(window.angular);