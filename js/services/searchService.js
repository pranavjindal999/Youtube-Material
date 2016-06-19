app.factory('searchService', function($http, $q) {
    var service = {};
    service.getVideos = function(pageToken, query) {
    	var data = $q.defer();
        var url = null;
        if (pageToken) {
            url = apiURL + 'search?part=snippet&type=video&maxResults=12&q=' + query + '&pageToken=' + pageToken + '&key=' + browserKey;
        } else {
            url = apiURL + 'search?part=snippet&type=video&maxResults=12&q=' + query + '&key=' + browserKey;
        }

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
        	data.resolve(response.data);
        }, null);
        return data.promise;
    }


    return service;
});
