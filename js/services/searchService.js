app.factory('searchService', function($q, $http, channelService) {
    var service = {};
    service.getVideos = function(pageToken, query, relatedToVideoId) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.search.list({
                'part': 'snippet',
                'type': 'video',
                'maxResults': '12',
                'relatedToVideoId': relatedToVideoId,
                'q': query,
                'pageToken': pageToken
            }).then(function(response) {
                data.resolve(response.result);
            });
        })
        return data.promise;
    }

    service.getVideosWithChannels = function(pageToken, query, relatedToVideoId) {
        var data = $q.defer();
        service.getVideos(pageToken, query, relatedToVideoId)
            .then(function(searchResult) {
                channelService.getChannels(getChannelIds(searchResult.items), 'items(id,snippet/thumbnails/default)')
                    .then(function(channels) {
                        var videosWithChannels = mapChannelstoVideos(searchResult.items, channels);
                        data.resolve(videosWithChannels);
                    })
            });
        return data.promise;
    }

    service.getSearchSuggestion = function(query) {
        var q = $q.defer();
        $http({
            method: 'JSONP',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            url: 'http://suggestqueries.google.com/complete/search?callback=JSON_CALLBACK&ds=yt&client=firefox&hl=en&q=' + query
        }).success(function(data) {
            q.resolve(data);
        })
        return q.promise;
    }

    service.getVideo = function(videoId) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.videos.list({
                'part': 'snippet,statistics',
                'id': videoId
            }).then(function(response) {
                data.resolve(response.result.items[0]);
            });
        })
        return data.promise;
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

    function getChannelIds(videos) {
        var channelIds = '';
        for (var i = videos.length - 1; i >= 0; i--) {
            channelIds += videos[i].snippet.channelId + ',';
        }
        return channelIds;
    }

    return service;
});
