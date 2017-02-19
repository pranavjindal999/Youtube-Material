(function(angular) {
    youtubeApp.controller('headerController', ['$timeout', '$window', '$rootScope', '$scope', '$state', '$location', 'searchService',
        function($timeout, $window, $rootScope, $scope, $state, $location, searchService) {

            $scope.fetchSearchSuggestion = function() {
                if ($scope.query) {
                    $scope.tinySpinner = true;
                    searchService.getSearchSuggestion($scope.query)
                        .then(function(data) {
                            $scope.tinySpinner = false;
                            $scope.selectedIndex = -1;
                            $scope.items = data;
                            if (data[1].length == 0 || !$scope.search_li)
                                $scope.searchSuggestion = false;
                            else
                                $scope.searchSuggestion = true;
                        });
                }
            }

            $scope.suggestionClick = function(query) {
                $scope.query = query;
                $scope.submit();
            }

            $scope.searchFocused = function() {
                $scope.search_ul = "nav-items-focus right";
                $scope.search_li = "search-item-li-focus";
                $scope.mobileSearchFocus = "mobile-search-focus";
                $timeout(function() { $scope.crossSign = true; }, 400);
                $scope.searchSuggestion = true;
                $scope.fetchSearchSuggestion();
                $scope.items = [];
            }

            $scope.searchBlured = function() {
                $scope.search_ul = "right nav-items";
                $scope.search_li = "";
                $timeout(function() { $scope.mobileSearchFocus = ""; }, 100);
                $scope.crossSign = false;
                $scope.searchSuggestion = false;
                $scope.selectedIndex = -1;
                $scope.items = [];
            }

            $scope.submit = function() {
                $state.go('home.searchVideos', { query: $scope.query, pageToken: null });
            }

            $scope.inputKeypress = function($event) {
                if ($event.keyCode == 38)
                    $event.preventDefault();
                if ($event.keyCode == 13) {
                    $event.target.blur();
                    $scope.submit();
                } else if ($event.keyCode == 40 && $scope.items[1].length > $scope.selectedIndex + 1 && $scope.items != []) {
                    $scope.selectedIndex++;
                    $scope.query = $scope.items[1][$scope.selectedIndex];
                } else if ($event.keyCode == 38 && $scope.selectedIndex > 0 && $scope.items != []) {
                    $scope.selectedIndex--;
                    $scope.query = $scope.items[1][$scope.selectedIndex];
                }
            }

            $scope.mouseOver = function($index) {
                $scope.selectedIndex = $index;
            }

            $scope.init = function() {
                if ($location.search().query) {
                    $scope.query = $location.search().query;
                } else {
                    $scope.query = "";
                }

                $scope.searchBlured();

                var windowResize = function() {
                    if ($window.innerWidth < 601) {
                        $rootScope.isMobile = true;
                        $rootScope.isTablet = false;
                        $rootScope.mobilePaddingMargin = "zero-padding zero-margin";
                    } else if ($window.innerWidth < 1025) {
                        $rootScope.isMobile = false;
                        $rootScope.isTablet = true;
                        $rootScope.mobilePaddingMargin = "";
                    } else {
                        $rootScope.isMobile = false;
                        $rootScope.isTablet = false;
                        $rootScope.mobilePaddingMargin = "";
                    }
                }

                angular.element($window).on('resize', function() {
                    $scope.$apply(function() {
                        windowResize();
                    });
                });
                windowResize();
            }
        }
    ]);
})(window.angular);
