(function(angular) {
    youtubeApp.controller('channelPageHomeController', ['$scope', '$state', '$stateParams', 'searchService',
        function($scope, $state, $stateParams, searchService) {       
            $scope.init = function(){
            	angular.element(document).scrollTo(0, 0, 700);
                
            	$scope.channelId = $stateParams.id;
            	$scope.mostPopular = {
            		'title' : 'Most Popular',
            		'value' : 'viewCount'
            	}

            	$scope.recent = {
            		'title' : 'Recently Uploaded',
            		'value' : 'date'
            	}

            }
        }
    ]);
})(window.angular);