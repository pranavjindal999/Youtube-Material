youtubeApp.factory('searchService', ['$q', '$http', function($q, $http) {
    var service = {};

    service.searchVideos = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.search.list({
                'channelId': parameters.channelId,
                'order': parameters.order,
                'part': 'snippet',
                'type': 'video',
                'regionCode': country,
                'maxResults': (parameters.maxResults) ? parameters.maxResults : 12,
                'relatedToVideoId': parameters.relatedToVideoId,
                'q': parameters.query,
                'pageToken': parameters.pageToken
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

    service.getVideos = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.videos.list({
                'regionCode': country,
                'chart': parameters.chart,
                'maxResults': parameters.maxResults,
                'pageToken': parameters.pageToken,
                'part': parameters.part,
                'id': parameters.videoId,
                'videoCategoryId': parameters.videoCategoryId,
                'fields': parameters.fields
            }).then(function(response) {
                try {
                    for (var i = 0; i < response.result.items.length; i++) {
                        response.result.items[i].contentDetails.duration = moment.duration(response.result.items[i].contentDetails.duration).format('h:m:ss');
                        response.result.items[i].contentDetails.duration = (response.result.items[i].contentDetails.duration.includes(':')) ? response.result.items[i].contentDetails.duration : ('0:' + response.result.items[i].contentDetails.duration);
                        response.result.items[i].statistics.viewCount = parseInt(response.result.items[i].statistics.viewCount).toLocaleString();
                    }

                } catch (err) {

                }
                data.resolve(response.result);
            });
        })
        return data.promise;
    }


    service.getVideoDetails = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.videos.list({
                'part': parameters.part,
                'id': getVideoIds(parameters.videos),
                'fields': parameters.fields
            }).then(function(response) {
                try {
                    for (var i = 0; i < response.result.items.length; i++) {
                        response.result.items[i].contentDetails.duration = moment.duration(response.result.items[i].contentDetails.duration).format('h:m:ss');
                        response.result.items[i].contentDetails.duration = (response.result.items[i].contentDetails.duration.includes(':')) ? response.result.items[i].contentDetails.duration : ('0:' + response.result.items[i].contentDetails.duration);
                        response.result.items[i].statistics.viewCount = parseInt(response.result.items[i].statistics.viewCount).toLocaleString();
                    }

                } catch (err) {

                }

                data.resolve(response.result.items);
            });
        })
        return data.promise;
    }

    service.getMappedChannels = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.channels.list({
                'part': 'snippet',
                'id': getChannelIds(parameters.videosToMap),
                'fields': parameters.fields
            }).then(function(response) {
                var mappedChannels = mapChannelstoVideos(parameters.videosToMap, response.result.items);
                data.resolve(mappedChannels);
            });
        })
        return data.promise;
    }

    service.getChannel = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.channels.list({
                'part': parameters.part,
                'id': parameters.channelId,
                'fields': parameters.fields
            }).then(function(response) {
                data.resolve(response.result.items[0]);
            });
        })
        return data.promise;
    }

    service.getVideoCategories = function() {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.videoCategories.list({
                'part': 'snippet',
                'regionCode': country
            }).then(function(response) {
                data.resolve(response.result.items);
            });
        })
        return data.promise;
    }

    service.getChannels = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.channels.list({
                'part': parameters.part,
                'id': parameters.channelIds,
                'fields': parameters.fields
            }).then(function(response) {
                data.resolve(response.result.items);
            });
        })
        return data.promise;
    }

    service.getCommentThreads = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.commentThreads.list({
                'part': 'snippet,replies',
                'videoId': parameters.videoId,
                'pageToken': parameters.pageToken,
                'maxResults': 8,
                'order': parameters.order,
                'fields': 'items(id,replies(comments(id,snippet(authorChannelUrl,authorDisplayName,authorGoogleplusProfileUrl,authorProfileImageUrl,canRate,likeCount,publishedAt,textDisplay,updatedAt))),snippet(canReply,topLevelComment(snippet(authorChannelUrl,authorDisplayName,authorGoogleplusProfileUrl,authorProfileImageUrl,canRate,likeCount,publishedAt,textDisplay,updatedAt)),totalReplyCount)),nextPageToken'
            }).then(function(response) {
                data.resolve(response.result);
            }, function(reason) {
                data.reject(reason.result);
            });
        })
        return data.promise;
    }

    service.getReplies = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.comments.list({
                'part': 'snippet',
                'parentId': parameters.parentId,
                'pageToken': parameters.pageToken,
                'maxResults': parameters.maxResults
            }).then(function(response) {
                data.resolve(response.result);
            }, function(reason) {
                data.reject(reason.result);
            });
        })
        return data.promise;
    }

    service.getSubscriptions = function(parameters) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.subscriptions.list({
                'part': parameters.part,
                'channelId': parameters.channelId,
                'maxResults': parameters.maxResults,
                'order': parameters.order,
                'fields': parameters.fields
            }).then(function(response) {
                data.resolve(response.result);
            }, function(reason) {
                data.reject(reason.result);
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

    var getVideoIds = function(videos) {
        var videoIds = '';
        for (var i = 0; i < videos.length; i++) {
            videoIds += videos[i].id.videoId + ',';
        }
        return videoIds;
    }

    return service;
}]);
