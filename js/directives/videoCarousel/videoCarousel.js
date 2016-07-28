(function(angular) {
    youtubeApp.directive('videoCarousel', function() {
        return {
            restrict: 'E',
            scope: {
                category: '=?',
                channelId: '=?'
            },
            templateUrl: 'js/directives/videoCarousel/videoCarousel.html',
            controller: ['$scope', '$sce', 'searchService', function($scope, $sce, searchService) {

                $scope.scrollFireLoad = function() {
                    if ($scope.category) {
                        var parameters = {
                            'videoCategoryId': $scope.category.id,
                            'part': 'snippet,statistics,contentDetails',
                            'maxResults': $scope.category.id ? 6 : 12,
                            'chart': 'mostPopular',
                            'pageToken': $scope.pageToken
                        }
                        searchService.getVideos(parameters).then(function(data) {
                            for (var i = 0; i < data.items.length; i++) {
                                data.items[i].contentDetails.duration = moment.duration(data.items[i].contentDetails.duration).format('h:m:ss');
                                data.items[i].contentDetails.duration = (data.items[i].contentDetails.duration.includes(':')) ? data.items[i].contentDetails.duration : ('0:' + data.items[i].contentDetails.duration);
                                data.items[i].statistics.viewCount = parseInt(data.items[i].statistics.viewCount).toLocaleString();
                                data.items[i].snippet.publishedAt = moment(data.items[i].snippet.publishedAt).fromNow();
                            }
                            $scope.videos = data.items;
                        })
                    }
                }
            }]
        };
    });
})(window.angular);
