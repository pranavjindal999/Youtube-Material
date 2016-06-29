(function(angular) {
    app.controller('youtubeController', ['$scope', 'searchService', 'channelService', '$location', '$httpParamSerializer',
        function($scope, searchService, channelService, $location, $httpParamSerializer) {

            if ($location.search().query) {
                $scope.query = $location.search().query;
                $scope.active = "active";
            }

            $scope.submit = function(pageToken) {
                var queryString = {};
                queryString.query = $scope.query;
                queryString.pageToken = pageToken;
                queryString = $httpParamSerializer(queryString);

                $scope.preloader = true;
                $scope.videos = false;
                $scope.nextPageToken = false;
                $scope.previousPageToken = false;
                $location.path('/search').search(queryString);

                searchService.getVideos($location.search().pageToken, $location.search().query)
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
