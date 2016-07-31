(function(angular) {
    youtubeApp.controller('channelPageAboutController', ['$scope', '$state', '$stateParams', 'searchService',
        function($scope, $state, $stateParams, searchService) {
            $scope.init = function() {
                angular.element(document).scrollTo(0, 0, 700);
                $scope.$parent.border ={};
                $scope.$parent.border.about = {
                    'border-bottom': '3px solid #FBB'
                }
                var parameters = {
                    'part': 'statistics',
                    'channelId': $stateParams.id
                }

                searchService.getChannel(parameters).then(function(channel) {
                    channel.statistics.viewCount = parseInt(channel.statistics.viewCount).toLocaleString();
                    channel.statistics.subscriberCount = parseInt(channel.statistics.subscriberCount).toLocaleString();
                    channel.statistics.videoCount = parseInt(channel.statistics.videoCount).toLocaleString();
                    $scope.$parent.channel.statistics = channel.statistics;
                })
            }
        }
    ]);
})(window.angular);
