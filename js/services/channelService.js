app.factory('channelService', function($q) {
    var service = {};
    service.getChannels = function(channels, fields) {
        var data = $q.defer();
        youtubeApi.then(function() {
            gapi.client.youtube.channels.list({
                'part': 'snippet',
                'id':channels,
                'fields': fields
            }).then(function(response) {
                data.resolve(response.result.items);
            });
        })
        return data.promise;
    }
    return service;
});
