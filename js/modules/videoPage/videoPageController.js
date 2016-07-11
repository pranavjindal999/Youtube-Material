(function(angular) {
    app.controller('videoPageController', ['$scope', '$state', '$stateParams', 'searchService',
        function($scope, $state, $stateParams, searchService) {
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
                $scope.dislikeWidth = (dislikes / (likes + dislikes)) * 100;

                if ($scope.video.snippet.description.length>300)
                {
                    $scope.isExpandable = true;
                    $scope.descriptionButton = "Expand Description";
                    $scope.expandDescription = function(){
                        if($scope.description=="expanded-description"){
                            $scope.description="";
                            $scope.descriptionButton = "Expand Description";
                            if($scope.isMobile)
                            window.scrollTo(0, 150);
                        else
                            window.scrollTo(0, 350);
                        }
                        else{
                            $scope.description="expanded-description";
                            $scope.descriptionButton = "Collapse Description";
                        }
                    }
                }
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
                        searchService.getChannel(video.snippet.channelId, 'items(id,snippet(thumbnails/default,title))')
                            .then(function(channel) {
                                $scope.channel = channel;
                            });
                    });

                searchService.getVideos(null, null, $scope.videoId)
                    .then(function(videos) {
                        $scope.relatedVideos = videos.items;

                        searchService.getVideoDetails($scope.relatedVideos, 'statistics,contentDetails')
                            .then(function(videoDetails) {
                                $scope.videoDetails = videoDetails;
                            });

                        searchService.getMappedChannels($scope.relatedVideos, 'items(id,snippet/thumbnails/default)')
                            .then(function(mappedChannels) {
                                $scope.channels = mappedChannels;
                            });
                    });
            }
        }
    ]);
})(window.angular);
