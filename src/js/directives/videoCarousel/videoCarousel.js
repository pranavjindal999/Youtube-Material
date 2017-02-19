(function(angular) {
    youtubeApp.directive('videoCarousel', function() {
        return {
            restrict: 'E',
            scope: {
                category: '=?',
                channelId: '=?',
                order: '=?'
            },
            templateUrl: 'js/directives/videoCarousel/videoCarousel.html',
            controller: ['$rootScope', '$scope', '$sce', 'searchService', function($rootScope, $scope, $sce, searchService) {

                var maxResults = function() {
                    if ($rootScope.isMobile) {
                        return 2;
                    } else if ($rootScope.isTablet) {
                        return 4;
                    } else {
                        return 6;
                    }
                }
                $scope.$watch('$root.isMobile.toLocaleString()+$root.isTablet.toLocaleString()', function(newValue, oldValue) {
                    if (newValue != oldValue)
                        $scope.scrollFireLoad();
                });
                
                $scope.loader = true;
                $scope.setMinHeight = function(){
                    if(!$scope.loader && !$scope.videos.length){
                        return {
                            'min-height' : '100px'
                        }
                    }
                }


                $scope.nextOrPrev = function(isNextClicked) {
                    $scope.loader = true;
                    $scope.isNextClicked = isNextClicked;
                    var parameters = null;
                    if ($scope.category) {
                        parameters = {
                            'pageToken': isNextClicked ? $scope.nextPageToken : $scope.prevPageToken,
                            'videoCategoryId': $scope.category.id,
                            'part': 'snippet,statistics,contentDetails',
                            'maxResults': maxResults(),
                            'chart': 'mostPopular'
                        }
                    } else {
                        parameters = {
                            'order': $scope.order.value,
                            'channelId': $scope.channelId,
                            'part': 'snippet',
                            'maxResults': maxResults(),
                            'pageToken': isNextClicked ? $scope.nextPageToken : $scope.prevPageToken
                        }
                    }
                    fetchVideos(parameters);
                }

                $scope.scrollFireLoad = function() {                    
                    var parameters = null;
                    if ($scope.category) {
                        $scope.title = $scope.category.snippet.title;
                        parameters = {
                            'videoCategoryId': $scope.category.id,
                            'part': 'snippet,statistics,contentDetails',
                            'maxResults': maxResults(),
                            'chart': 'mostPopular'
                        }
                    } else {
                        $scope.title = $scope.order.title;
                        parameters = {
                            'order': $scope.order.value,
                            'channelId': $scope.channelId,
                            'part': 'snippet',
                            'maxResults': maxResults()
                        }
                    }
                    fetchVideos(parameters);
                }

                var fetchVideos = function(parameters) {
                    if ($scope.category) {
                        searchService.getVideos(parameters).then(function(data) {
                            for (var i = 0; i < data.items.length; i++) {
                                data.items[i].snippet.publishedAt = moment(data.items[i].snippet.publishedAt).fromNow();
                                data.items[i].videoId = data.items[i].id;
                            }
                            $scope.nextPageToken = data.nextPageToken;
                            $scope.prevPageToken = data.prevPageToken;
                            $scope.videos = data.items;
                            $scope.loader = false;
                        })
                    } else {
                        searchService.searchVideos(parameters).then(function(data){
                            $scope.videos = data.items;
                            $scope.nextPageToken = data.nextPageToken;
                            $scope.prevPageToken = data.prevPageToken;
                            $scope.loader = false;

                            var parameters = {
                            'videos': $scope.videos,
                            'part': 'statistics,contentDetails'
                            }

                            for (var i = 0; i < data.items.length; i++) {
                                $scope.videos[i].snippet.publishedAt = moment($scope.videos[i].snippet.publishedAt).fromNow();
                                $scope.videos[i].videoId = $scope.videos[i].id.videoId;
                            }

                            searchService.getVideoDetails(parameters)
                            .then(function(videoDetails) {
                                for (var i = 0; i < videoDetails.length; i++) {
                                    $scope.videos[i].statistics = videoDetails[i].statistics;
                                    $scope.videos[i].contentDetails = videoDetails[i].contentDetails;                                    
                                }
                            });                            
                        })
                    }
                }
            }]
        };
    });
})(window.angular);
