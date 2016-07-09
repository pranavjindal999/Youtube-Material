(function(angular) {
    app.controller('videoPageController', ['$scope', '$state', '$stateParams', 'searchService', 'channelService',
        function($scope, $state, $stateParams, searchService, channelService) {

            $scope.formatVideoDetails = function() {
                if (moment().format("M D YY") == moment($scope.video.snippet.publishedAt).format("M D YY")) {
                    $scope.uploadedTime = moment($scope.video.snippet.publishedAt)
                        .fromNow();
                } else {
                    $scope.uploadedTime = moment($scope.video.snippet.publishedAt)
                        .format("Do MMMM YYYY");
                }

                $scope.viewCount = parseInt($scope.video.statistics.viewCount).toLocaleString();
                var likes = parseInt($scope.video.statistics.likeCount);
                var dislikes = parseInt($scope.video.statistics.dislikeCount);
                $scope.likeCount = likes.toLocaleString();
                $scope.dislikeCount = dislikes.toLocaleString();
                $scope.dislikeWidth = (dislikes/(likes+dislikes))*100;
            }

            $scope.init = function() {
                window.scrollTo(0, 0);
                $scope.videoId = $stateParams.id;
                $(window).resize(function() {
                    $scope.$apply(function() {
                        if (window.innerWidth < 993) {
                            $scope.isMobile = "zero-padding zero-margin";
                        } else {
                            $scope.isMobile = "";
                        }
                    });
                });

                if (window.innerWidth < 993) {
                    $scope.isMobile = "zero-padding zero-margin";
                } else {
                    $scope.isMobile = "";
                }

                searchService.getVideo($scope.videoId)
                    .then(function(video) {
                        $scope.video = video;
                        $scope.formatVideoDetails();
                        channelService.getChannels(video.snippet.channelId, 'items(snippet(thumbnails/default,title))')
                            .then(function(channels) {
                                $scope.channel = channels[0];
                            });
                    });

                searchService.getVideosWithChannels(null, null, $scope.videoId)
                    .then(function(relatedVideos) {
                        $scope.relatedVideos = relatedVideos;
                    });




                $(document).ready(function() {
                    $('.collapsible').collapsible({
                        accordion: true
                    });
                });
            }
        }
    ]);
})(window.angular);
