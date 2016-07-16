(function(angular) {
    youtubeApp.controller('channelPageVideosController', ['$scope', '$state', '$stateParams', 'searchService',
        function($scope, $state, $stateParams, searchService) {
            $scope.init = function() {
                angular.element(document).scrollTo(0, 0, 700);
                $scope.$parent.videosTab = "active";

                $scope.loader = true;
                var parameters = {
                    'channelId': $stateParams.id,
                    'order': 'date',
                    'maxResults': 24
                }

                searchService.getVideos(parameters).then(function(videos) {
                    $scope.videos = videos.items;
                    $scope.loader = false;
                    $scope.nextPageToken = videos.nextPageToken;
                });

                $scope.loadMoreVideos = function() {
                    var parameters = {
                        'channelId': $stateParams.id,
                        'order': 'date',
                        'pageToken': $scope.nextPageToken,
                    }

                    $scope.loader = true;
					$scope.nextPageToken = false;
                    searchService.getVideos(parameters).then(function(videos) {
                        $scope.videos = $scope.videos.concat(videos.items);
                        $scope.loader = false;
                        $scope.nextPageToken = videos.nextPageToken;
                    });
                }
            }
        }
    ]);
})(window.angular);
