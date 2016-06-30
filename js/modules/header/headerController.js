(function(angular) {
    app.controller('headerController', ['$scope', '$state', '$location',
        function($scope, $state, $location) {

            if ($location.search().query) {
                $scope.query = $location.search().query;
            }

            $scope.submit = function($event) {
                $event.target.blur();
                $state.go('home.searchVideos', { query: $scope.query, pageToken: null });
            }

        }
    ]);
})(window.angular);
