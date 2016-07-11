app.factory('searchService', function($q, $http) {
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
                'id': videoId,
                'fields': 'items(snippet(publishedAt,channelId,description,title),statistics(commentCount,dislikeCount,likeCount,viewCount))'
            }).then(function(response) {
                data.resolve(response.result.items[0]);
            });
        })
        return data.promise;
    }


    service.getVideoDetails = function(videos, part, fields) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.videos.list({
                'part': part,
                'id': getVideoIds(videos),
                'fields': fields
            }).then(function(response) {
                for (var i = 0; i < response.result.items.length; i++) {
                    response.result.items[i].contentDetails.duration = moment.duration(response.result.items[i].contentDetails.duration).format();
                }
                data.resolve(response.result.items);
            });
        })
        return data.promise;
    }

    service.getMappedChannels = function(videosToMap, fields) {        
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.channels.list({
                'part': 'snippet',
                'id': getChannelIds(videosToMap),
                'fields': fields
            }).then(function(response) {
                var mappedChannels = mapChannelstoVideos(videosToMap, response.result.items);
                data.resolve(mappedChannels);
            });
        })
        return data.promise;
    }

    service.getChannel = function(channelId, fields) {        
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.channels.list({
                'part': 'snippet',
                'id': channelId,
                'fields': fields
            }).then(function(response) {
                data.resolve(response.result.items[0]);
            });
        })
        return data.promise;
    }

    var mapChannelstoVideos = function(videos, channels) {
        var mappedChannels = [];
        for (var i = 0; i < videos.length; i++) {
            for (var j = 0; j < channels.length; j++) {
                if (channels[j].id == videos[i].snippet.channelId) {
                    mappedChannels[i] = {};
                    mappedChannels[i].channelThumbnail = channels[j].snippet.thumbnails.default.url;
                    break;
                }
            }
        }
        return mappedChannels;
    }

    var getChannelIds = function(videos) {
        var channelIds = '';
        for (var i = videos.length - 1; i >= 0; i--) {
            channelIds += videos[i].snippet.channelId + ',';
        }
        return channelIds;
    }

    function getVideoIds(videos) {
        var videoIds = '';
        for (var i = videos.length - 1; i >= 0; i--) {
            videoIds += videos[i].id.videoId + ',';
        }
        return videoIds;
    }

    return service;
});
