app.factory('channelService', function($q) {
    var service = {};
    service.getChannels = function(channels) {

        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.channels.list({
                'part': 'snippet',
                'id':channels,
                'fields':'items(id,snippet/thumbnails/default)'
            }).then(function(response) {
                data.resolve(response.result.items);
            });
        })
        return data.promise;
    }
    return service;
});
