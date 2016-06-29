(function(angular) {
    angular.module('videoItem', []).directive('videoItem', function() {
        return {
            restrict: 'E',
            scope: {
                video: '=video'
            },
            templateUrl: 'js/directives/videoItem/videoItem.html'
        };
    });
})(window.angular);