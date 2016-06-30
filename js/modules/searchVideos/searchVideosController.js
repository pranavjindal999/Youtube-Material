(function(angular) {
    app.controller('youtubeController', ['$scope', '$state','searchService', 'channelService', '$stateParams',
        function($scope, $state, searchService, channelService, $stateParams) {

            $scope.submit = function() {
                $scope.preloader = true;
                $scope.videos = false;
                $scope.nextPageToken = false;
                $scope.previousPageToken = false;

                searchService.getVideos($stateParams.pageToken, $stateParams.query)
                    .then(function(searchResult) {
                        channelService.getChannels(getChannelIds(searchResult.items))
                            .then(function(channels) {
                                $scope.videos = mapChannelstoVideos(searchResult.items, channels);
                                $scope.nextPageToken = searchResult.nextPageToken;
                                $scope.previousPageToken = searchResult.prevPageToken;
                                $scope.preloader = false;
                            });
                    });
            }
            $scope.nextOrPrevious = function(pageToken){
                $state.go('home.searchVideos', { query: $stateParams.query , pageToken : pageToken });
            }
            $scope.submit();
        }
    ]);
})(window.angular);

function getChannelIds(videos) {
    var channelIds = '';
    for (var i = videos.length - 1; i >= 0; i--) {
        channelIds += videos[i].snippet.channelId + ',';
    }
    return channelIds;
}

function mapChannelstoVideos(videos, channels) {
    for (var i = 0; i < videos.length; i++) {
        for (var j = 0; j < channels.length; j++) {
            if (channels[j].id == videos[i].snippet.channelId) {
                videos[i].snippet.channelThumbnail = channels[j].snippet.thumbnails.default.url;
                break;
            }
        }
    }
    return videos;
}
