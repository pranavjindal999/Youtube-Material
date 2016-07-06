(function(angular) {
    app.controller('headerController', ['$scope', '$state', '$location', 'searchService',
        function($scope, $state, $location, searchService) {

            $scope.fetchSearchSuggestion = function() {
                searchService.getSearchSuggestion($scope.query)
                    .then(function(data) {
                        $scope.items = data;
                    })
            }
            $scope.suggestionClick = function(query) {
                $scope.query = query;
                $scope.submit();
            }
            $scope.items = ["tvf", "tvf play", "tvf pitchers", "tvf permanent roommates"];
            $scope.searchFocused = function() {
                $scope.search_ul = "nav-items-focus right";
                $scope.search_li = "search-item-li-focus";
                $scope.mobileSearchFocus = "hide-on-small-only";
                $scope.crossSign = true;
                $scope.searchSuggestion = true;
            }

            $scope.searchBlured = function() {
                $scope.search_ul = "right nav-items";
                $scope.search_li = "";
                $scope.mobileSearchFocus = "";
                $scope.crossSign = false;
                $scope.searchSuggestion = false;
            }

            $scope.submit = function($event) {
                try { $event.target.blur(); } catch (err) {}
                $state.go('home.searchVideos', { query: $scope.query, pageToken: null });
            }

            $scope.init = function() {
                if ($location.search().query) {
                    $scope.query = $location.search().query;
                }
                $scope.searchBlured();
            }

        }
    ]);
})(window.angular);
