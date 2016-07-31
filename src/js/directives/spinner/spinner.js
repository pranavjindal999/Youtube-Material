(function(angular) {
    youtubeApp.directive('spinner', function() {
        return {
            restrict: 'E',
            templateUrl: 'src/js/directives/spinner/spinner.html',
        };
    });
})(window.angular);