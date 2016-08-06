(function(angular) {
    youtubeApp.directive('videoItem', function() {
        return {
            restrict: 'E',
            scope: {
                video: '=',
                videoDetail: '=',
                hideChannel: '='
            },
            templateUrl: 'src/js/directives/videoItem/videoItem.html',
            link: function(scope, element, attr) {
                scope.video.snippet.publishedAt = moment(scope.video.snippet.publishedAt).fromNow();
            }
        };
    });
})(window.angular);
