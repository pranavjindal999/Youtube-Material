(function(angular) {
    youtubeApp.controller('youtubeController', ['$scope', '$state', 'searchService', '$stateParams',
        function($scope, $state, searchService, $stateParams) {

            $scope.submit = function() {
                $scope.preloader = true;
                $scope.videos = false;
                $scope.nextPageToken = false;
                $scope.previousPageToken = false;

                searchService.getVideos($stateParams.pageToken, $stateParams.query)
                    .then(function(videos) {
                        $scope.videos = videos.items;
                        $scope.nextPageToken = videos.nextPageToken;
                        $scope.previousPageToken = videos.prevPageToken;
                        $scope.preloader = false;

                        searchService.getVideoDetails($scope.videos, 'statistics,contentDetails')
                            .then(function(videoDetails) {
                                $scope.videoDetails = videoDetails;
                            });

                        searchService.getMappedChannels($scope.videos, 'items(id,snippet/thumbnails/default)')
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
