(function(angular) {
    youtubeApp.controller('homePageController', ['$scope', '$state', 'searchService', '$stateParams',
        function($scope, $state, searchService, $stateParams) {

            $scope.videoCategories = [{
                'snippet': {
                    'title': 'Popular Now'
                }
            }, {
                'id': 10,
                'snippet': {
                    'title': 'Music'
                }
            }, {
                'id': 23,
                'snippet': {
                    'title': 'Comedy'
                }
            }, {
                'id': 1,
                'snippet': {
                    'title': 'Film & Animation'
                }
            }, {
                'id': 17,
                'snippet': {
                    'title': 'Sports'
                }
            }, {
                'id': 28,
                'snippet': {
                    'title': 'Technology'
                }
            }, {
                'id': 19,
                'snippet': {
                    'title': 'Travel & Events'
                }
            }, {
                'id': 27,
                'snippet': {
                    'title': 'Education'
                }
            }, {
                'id': 22,
                'snippet': {
                    'title': 'People & Blogs'
                }
            }]
        }
    ]);
})(window.angular);
