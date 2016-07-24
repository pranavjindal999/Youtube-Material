(function(angular) {
    youtubeApp.controller('channelPageVideosController', ['$scope', '$state', '$stateParams', 'searchService',
        function($scope, $state, $stateParams, searchService) {
            $scope.init = function() {
                angular.element(document).scrollTo(0, 0, 700);
                $scope.$parent.videosTab = "active";

                $scope.loaderVideos = true;
                var parameters = {
                    'channelId': $stateParams.id,
                    'order': 'date',
                    'maxResults': 24
                }

                searchService.searchVideos(parameters).then(function(videos) {
                    $scope.videos = videos.items;
                    $scope.loaderVideos = false;
                    $scope.nextPageToken = videos.nextPageToken;

                    var parameters = {
                        'videos': $scope.videos,
                        'part': 'statistics,contentDetails'
                    }
                    searchService.getVideoDetails(parameters)
                        .then(function(videoDetails) {
                            $scope.videoDetails = videoDetails;
                        });
                });

                $scope.loadMoreVideos = function() {
                    var parameters = {
                        'channelId': $stateParams.id,
                        'order': 'date',
                        'pageToken': $scope.nextPageToken,
                    }

                    $scope.loaderVideos = true;
                    $scope.nextPageToken = false;
                    searchService.searchVideos(parameters).then(function(nextVideos) {
                        $scope.videos = $scope.videos.concat(nextVideos.items);
                        $scope.loaderVideos = false;
                        $scope.nextPageToken = nextVideos.nextPageToken;

                        var parameters = {
                            'videos': nextVideos.items,
                            'part': 'statistics,contentDetails'
                        }
                        searchService.getVideoDetails(parameters)
                            .then(function(nextVideoDetails) {
                                $scope.videoDetails = $scope.videoDetails.concat(nextVideoDetails);
                            });
                    });
                }
            }
        }
    ]);
})(window.angular);
