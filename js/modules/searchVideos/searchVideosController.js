(function(angular) {
    app.controller('youtubeController', ['$scope', '$state','searchService', 'channelService', '$stateParams',
        function($scope, $state, searchService, channelService, $stateParams) {

            $scope.submit = function() {
                $scope.preloader = true;
                $scope.videos = false;
                $scope.nextPageToken = false;
                $scope.previousPageToken = false;

                searchService.getVideosWithChannels($stateParams.pageToken, $stateParams.query)
                    .then(function(searchResult) {
                                $scope.videos = searchResult
                                $scope.nextPageToken = searchResult.nextPageToken;
                                $scope.previousPageToken = searchResult.prevPageToken;
                                $scope.preloader = false;
                            });
            }
            $scope.nextOrPrevious = function(pageToken){
                $state.go('home.searchVideos', { query: $stateParams.query , pageToken : pageToken });
            }
            $scope.submit();
        }
    ]);
})(window.angular);