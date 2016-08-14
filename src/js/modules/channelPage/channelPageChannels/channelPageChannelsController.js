(function(angular) {
    youtubeApp.controller('channelPageChannelsController', ['$document','$scope', '$state', '$stateParams', 'searchService',
        function($document, $scope, $state, $stateParams, searchService) {
            $scope.init = function() {
                angular.element($document).scrollTo(0, 0, 700);
                
                $scope.loaderFeatured = true;
                $scope.$parent.deferedChannel.promise.then(function(channel) {
                    if (!channel.brandingSettings.channel.featuredChannelsUrls) {
                        $scope.loaderFeatured = false;
                        return;
                    }
                    var channelIds = [];
                    for (var i = 0; i < channel.brandingSettings.channel.featuredChannelsUrls.length; i++) {
                        channelIds += channel.brandingSettings.channel.featuredChannelsUrls[i] + ',';
                    }
                    var parameters = {
                        'channelIds': channelIds,
                        'part': 'snippet',
                        'fields': 'items(id,snippet(thumbnails/medium,title))'
                    }

                    searchService.getChannels(parameters).then(function(channels) {
                        $scope.featuredChannels = channels;
                        $scope.loaderFeatured = false;
                    })
                });


                $scope.loaderSubscribed = true;
                $scope.subscriptionsAllowed = true;
                var parameters = {
                    'part': 'snippet',
                    'channelId': $stateParams.id,
                    'maxResults': 50,
                    'fields': 'items(snippet(resourceId/channelId,thumbnails/medium,title))'
                }

                searchService.getSubscriptions(parameters).then(function(subscribedChannels) {
                    if (subscribedChannels.items.length) {                        
                        $scope.subscribedChannels = subscribedChannels.items;
                        $scope.loaderSubscribed = false;
                    }
                }, function(data){
                        $scope.subscriptionsAllowed = false;
                        $scope.loaderSubscribed = false;
                });
            }
        }
    ]);
})(window.angular);
