(function(angular) {
    youtubeApp.directive('videoItem', function() {
        return {
            restrict: 'E',
            scope: {
                video: '=video',
                videoDetail: '=videoDetail',
                channel: '=channel'
            },
            templateUrl: 'src/js/directives/videoItem/videoItem.html',
            link: function(scope, element, attr) {
                scope.video.snippet.publishedAt = moment(scope.video.snippet.publishedAt).fromNow();
            }
        };
    });
})(window.angular);
