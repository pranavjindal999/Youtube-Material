(function(angular) {
    youtubeApp.controller('headerController', ['$scope', '$state', '$location', 'searchService',
        function($scope, $state, $location, searchService) {

            $scope.fetchSearchSuggestion = function() {
                if ($scope.query)
                    searchService.getSearchSuggestion($scope.query)
                    .then(function(data) {
                        $scope.selectedIndex = -1;
                        $scope.items = data;                        
                        if(data[1].length==0 || !$scope.search_li)
                            $scope.searchSuggestion=false;
                        else
                            $scope.searchSuggestion=true;
                    });
            }

            $scope.suggestionClick = function(query) {
                $scope.query = query;
                $scope.submit();
            }

            $scope.searchFocused = function() {
                $scope.search_ul = "nav-items-focus right";
                $scope.search_li = "search-item-li-focus";
                $scope.mobileSearchFocus = "hide-on-small-only";
                $scope.searchSuggestion = true;
                $scope.crossSign = true;
                $scope.fetchSearchSuggestion();
                $scope.items = [];
            }

            $scope.searchBlured = function() {
                $scope.search_ul = "right nav-items";
                $scope.search_li = "";
                $scope.mobileSearchFocus = "";
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
            }

        }
    ]);
})(window.angular);
