app.factory('searchService', function($q, $http) {
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
    return service;
});
