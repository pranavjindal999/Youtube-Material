(function(angular) {
    youtubeApp.controller('channelPageController', ['$q','$document', '$rootScope', '$scope', '$state', '$stateParams', 'searchService',
        function($q, $document, $rootScope, $scope, $state, $stateParams, searchService) {
            $scope.init = function() {
                $('ul.tabs').tabs();

                var parameters = {
                    'part': 'snippet,brandingSettings',
                    'channelId': $stateParams.id,
                    'fields': 'items(brandingSettings(channel(description,featuredChannelsTitle,featuredChannelsUrls),image(bannerMobileImageUrl,bannerTabletImageUrl)),snippet(description,publishedAt,thumbnails/medium,title))'
                }

                $scope.deferedChannel = $q.defer();
                $scope.channel={};
                searchService.getChannel(parameters).then(function(channelData) {
                    $scope.channel.brandingSettings = channelData.brandingSettings;
                    $scope.channel.snippet = channelData.snippet;
                    $scope.channel.snippet.publishedAt = moment($scope.channel.snippet.publishedAt).format('Do MMMM, YYYY');
                    $scope.channel.brandingSettings.channel.featuredChannelsTitle = ($scope.channel.brandingSettings.channel.featuredChannelsTitle)?$scope.channel.brandingSettings.channel.featuredChannelsTitle:'Featured Channels';
                    $scope.deferedChannel.resolve($scope.channel);
                });

                $document.on('scroll', function() {
                    if ($document.scrollTop() > ($rootScope.isMobile?175:300)) {
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

                $scope.homeTab = "";
                $scope.videosTab = "";
                $scope.channelsTab = "";
                $scope.aboutTab = "";
            }

            $scope.changeState = function(pageNumber) {
                switch (pageNumber) {
                    case 0:
                        $state.go("home.channelPage.home");
                        break;
                    case 1:
                        $state.go("home.channelPage.videos");
                        break;
                    case 2:
                        $state.go("home.channelPage.channels");
                        break;
                    case 3:
                        $state.go("home.channelPage.about");
                        break;
                }

            }
        }
    ]);
})(window.angular);
