(function(angular) {
    youtubeApp.directive('videoItem', function() {
        return {
            restrict: 'E',
            scope: {
                video: '=video',
                videoDetail: '=videoDetail',
                channel: '=channel'
            },
            templateUrl: 'js/directives/videoItem/videoItem.html',
            link: function(scope, element, attr) {
                scope.uploaded = moment(scope.video.snippet.publishedAt).fromNow();
            }
        };
    });
})(window.angular);
