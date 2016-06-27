app.controller('youtubeController', ['$scope', 'searchService', '$location', '$httpParamSerializer',
    function($scope, searchService, $location, $httpParamSerializer) {

        $scope.preloader = false;
        $scope.response = false;
        if ($location.search().query) {
            $scope.query = $location.search().query;
            $scope.active = "active";
        }
        searchService.getVideos($location.search().pageToken, $location.search().query).then(function(response) {
            $scope.response = response;
            $scope.preloader = false;
        });


        $scope.submit = function(pageToken) {
            var queryString = {};
            queryString.query = $scope.query;
            queryString.pageToken = pageToken;
            queryString = $httpParamSerializer(queryString);

            $scope.preloader = true;
            $scope.response = false;
            $location.path('/search').search(queryString);

            searchService.getVideos($location.search().pageToken, $location.search().query).then(function(response) {
                $scope.response = response;
                $scope.preloader = false;
            });
        }
    }
]);
