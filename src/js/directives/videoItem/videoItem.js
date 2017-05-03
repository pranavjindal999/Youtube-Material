(function(angular) {
    youtubeApp.directive('videoItem', function() {
        return {
            restrict: 'E',
            scope: {
                video: '=',
                videoDetail: '=',
                hideChannel: '='
            },
            templateUrl: 'js/directives/videoItem/videoItem.html',
            link: function(scope, element, attr) {
                var unwatch = scope.$watch('video',function(){
                    scope.video.snippet.publishedAt = moment(scope.video.snippet.publishedAt).fromNow();
                    unwatch();
                })   
            }
        };
    });
})(window.angular);
