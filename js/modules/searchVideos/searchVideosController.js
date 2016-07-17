(function(angular) {
    youtubeApp.controller('youtubeController', ['$scope', '$state', 'searchService', '$stateParams',
        function($scope, $state, searchService, $stateParams) {

            $scope.submit = function() {
                $scope.preloader = true;
                $scope.videos = false;
                $scope.nextPageToken = false;
                $scope.previousPageToken = false;

                var parameters = {
                    'pageToken': $stateParams.pageToken,
                    'query': $stateParams.query
                }
                searchService.getVideos(parameters)
                    .then(function(videos) {
                        $scope.videos = videos.items;
                        $scope.nextPageToken = videos.nextPageToken;
                        $scope.previousPageToken = videos.prevPageToken;
                        $scope.preloader = false;

                        var parameters = {
                            'videos': $scope.videos,
                            'part': 'statistics,contentDetails'
                        }
                        searchService.getVideoDetails(parameters)
                            .then(function(videoDetails) {
                                $scope.videoDetails = videoDetails;
                            });

                        var parameters = {
                            'videosToMap': $scope.videos,
                            'fields': 'items(id,snippet/thumbnails/default)'
                        }
                        searchService.getMappedChannels(parameters)
                            .then(function(mappedChannels) {
                                $scope.channels = mappedChannels;
                            });

                    });
            }

            $scope.nextOrPrevious = function(pageToken) {
                $state.go('home.searchVideos', { query: $stateParams.query, pageToken: pageToken });
            }
            $scope.submit();
        }
    ]);
})(window.angular);
