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
                            'part': 'snippet',
                            'maxResults': $scope.category.id ? 6 : 12,
                            'chart': 'mostPopular',
                            'pageToken': $scope.pageToken
                        }
                        searchService.getVideos(parameters).then(function(data) {
                            $scope.videos = data.items;
                        })
                    }
                }

            }]
        };
    });
})(window.angular);
