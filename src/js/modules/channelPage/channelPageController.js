(function(angular) {
    youtubeApp.controller('channelPageController', ['$q', '$document', '$rootScope', '$scope', '$state', '$stateParams', 'searchService',
        function($q, $document, $rootScope, $scope, $state, $stateParams, searchService) {
            $scope.init = function() {
                var parameters = {
                    'part': 'snippet,brandingSettings',
                    'channelId': $stateParams.id,
                    'fields': 'items(brandingSettings(channel(description,featuredChannelsTitle,featuredChannelsUrls),image(bannerMobileImageUrl,bannerTabletImageUrl)),snippet(description,publishedAt,thumbnails/medium,title))'
                }

                $scope.deferedChannel = $q.defer();
                $scope.channel = {};
                searchService.getChannel(parameters).then(function(channelData) {
                    $scope.channel.brandingSettings = channelData.brandingSettings;
                    $scope.channel.snippet = channelData.snippet;
                    $scope.channel.snippet.publishedAt = moment($scope.channel.snippet.publishedAt).format('Do MMM, YYYY');
                    if (!$scope.channel.brandingSettings)
                        $scope.channel.brandingSettings = {};
                    if (!$scope.channel.brandingSettings.channel)
                        $scope.channel.brandingSettings.channel = {};
                    $scope.channel.brandingSettings.channel.featuredChannelsTitle = ($scope.channel.brandingSettings.channel.featuredChannelsTitle) ? $scope.channel.brandingSettings.channel.featuredChannelsTitle : 'Featured Channels';
                    $scope.channel.snippet.description = ($scope.channel.snippet.description) ? $scope.channel.snippet.description : 'No Description Available';
                    $scope.deferedChannel.resolve($scope.channel);
                });


                $document.on('scroll', function() {
                    var position = document.getElementById("channel-banner").getBoundingClientRect();
                    if (position.bottom < (($rootScope.isMobile) ? 56 : 64)) {
                        if ($scope.channelTab != "channel-tab-main-div-fixed") { //for reducing digest cycles on scroll.
                            $scope.$apply($scope.channelTab = "channel-tab-main-div-fixed");
                            $scope.$apply($scope.channelTabContent = "channel-tab-content-fixed");
                        }
                    } else {
                        if ($scope.channelTab != "channel-tab-main-div") { //for reducing digest cycles on scroll.
                            $scope.$apply($scope.channelTab = "channel-tab-main-div");
                            $scope.$apply($scope.channelTabContent = "");
                        }
                    }
                });

                $scope.$on("$destroy", function() {
                    $document.unbind('scroll');
                });
            }
        }
    ]);
})(window.angular);
