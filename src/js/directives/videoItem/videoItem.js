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
                scope.$watch('video',function(){
                    scope.video.snippet.publishedAt = moment(scope.video.snippet.publishedAt).fromNow();
                })   
            }
        };
    });
})(window.angular);
