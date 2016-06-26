app.controller('youtubeController', ['$scope', 'searchService',
    function($scope, searchService) {

        $scope.preloader = false;
        $scope.response = false;

        $scope.submit = function(pageToken) {
            $scope.preloader = true;
            $scope.response = false;

            searchService.getVideos(pageToken, $scope.query).then(function(response) {
                $scope.response = response;
                $scope.preloader = false;
            });
        }
    }
]);
