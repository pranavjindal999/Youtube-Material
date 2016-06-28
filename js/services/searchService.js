app.factory('searchService', function($q) {
    var service = {};
    service.getVideos = function(pageToken, query) {

        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.search.list({
                'part': 'snippet',
                'type': 'video',
                'maxResults': '12',
                'q': query,
                'pageToken': pageToken
            }).then(function(response) {
                data.resolve(response.result);
            });
        })
        return data.promise;
    }
    return service;
});
