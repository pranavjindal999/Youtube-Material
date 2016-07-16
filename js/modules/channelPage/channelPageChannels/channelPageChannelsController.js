(function(angular) {
    youtubeApp.controller('channelPageChannelsController', ['$scope', '$state', '$stateParams', 'searchService',
        function($scope, $state, $stateParams, searchService) {       
            $scope.init = function(){
            	angular.element(document).scrollTo(0, 0, 700);
            	$scope.$parent.channelsTab = "active";

            	$scope.loader = true;
            	$scope.$parent.deferedChannel.promise.then(function(channel){
            		var channelIds = [];
            		for (var i = 0; i < channel.brandingSettings.channel.featuredChannelsUrls.length; i++) {
            			channelIds += channel.brandingSettings.channel.featuredChannelsUrls[i] + ',';
            		}
            		var parameters = {
            			'channelIds' : channelIds,
            			'part' : 'snippet',
            			'fields' : 'items(id,snippet(thumbnails/medium,title))'
            		}

            		searchService.getChannels(parameters).then(function(channels){
            			$scope.featuredChannels = channels;
            			$scope.loader = false;
            		})
            		
            	})
            }
        }
    ]);
})(window.angular);