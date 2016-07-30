(function(angular) {
    youtubeApp.directive('videoCarousel', function() {
        return {
            restrict: 'E',
            scope: {
                category: '=?',
                channelId: '=?'
            },
            templateUrl: 'js/directives/videoCarousel/videoCarousel.html',
            controller: ['$rootScope', '$scope', '$sce', 'searchService', function($rootScope, $scope, $sce, searchService) {

                var maxResults = function() {
                    if ($rootScope.isMobile) {
                        return 2;
                    } else if ($rootScope.isTablet) {
                        return 3;
                    } else {
                        return 6;
                    }
                }

                $scope.$watch('$root.isMobile.toLocaleString()+$root.isTablet.toLocaleString()', function(newValue, oldValue) {
                    if (newValue != oldValue)
                        $scope.scrollFireLoad();
                });

                $scope.nextOrPrev = function(isNextClicked) {
                    $scope.loader = true;
                    $scope.isNextClicked = isNextClicked;
                    var parameters = {
                        'pageToken': isNextClicked ? $scope.nextPageToken : $scope.prevPageToken,
                        'videoCategoryId': $scope.category.id,
                        'part': 'snippet,statistics,contentDetails',
                        'maxResults': maxResults(),
                        'chart': 'mostPopular'
                    }
                    searchService.getVideos(parameters).then(function(data) {
                        for (var i = 0; i < data.items.length; i++) {
                            try {
                                data.items[i].contentDetails.duration = moment.duration(data.items[i].contentDetails.duration).format('h:m:ss');
                                data.items[i].contentDetails.duration = (data.items[i].contentDetails.duration.includes(':')) ? data.items[i].contentDetails.duration : ('0:' + data.items[i].contentDetails.duration);
                                data.items[i].statistics.viewCount = parseInt(data.items[i].statistics.viewCount).toLocaleString();
                                data.items[i].snippet.publishedAt = moment(data.items[i].snippet.publishedAt).fromNow();
                            } catch (err) {}
                        }
                        $scope.nextPageToken = data.nextPageToken;
                        $scope.prevPageToken = data.prevPageToken;
                        $scope.videos = data.items;
                        $scope.loader = false;
                    })
                }

                $scope.scrollFireLoad = function() {
                    $scope.loader = true;
                    if ($scope.category) {
                        var parameters = {
                            'videoCategoryId': $scope.category.id,
                            'part': 'snippet,statistics,contentDetails',
                            'maxResults': maxResults(),
                            'chart': 'mostPopular'
                        }
                        searchService.getVideos(parameters).then(function(data) {
                            for (var i = 0; i < data.items.length; i++) {
                                try {
                                    data.items[i].contentDetails.duration = moment.duration(data.items[i].contentDetails.duration).format('h:m:ss');
                                    data.items[i].contentDetails.duration = (data.items[i].contentDetails.duration.includes(':')) ? data.items[i].contentDetails.duration : ('0:' + data.items[i].contentDetails.duration);
                                    data.items[i].statistics.viewCount = parseInt(data.items[i].statistics.viewCount).toLocaleString();
                                    data.items[i].snippet.publishedAt = moment(data.items[i].snippet.publishedAt).fromNow();
                                } catch (err) {}
                            }
                            $scope.nextPageToken = data.nextPageToken;
                            $scope.prevPageToken = data.prevPageToken;
                            $scope.videos = data.items;
                            $scope.loader = false;
                        })
                    }
                }
            }]
        };
    });
})(window.angular);
