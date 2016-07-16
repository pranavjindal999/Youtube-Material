(function(angular) {
    youtubeApp.controller('channelPageHomeController', ['$scope', '$state', '$stateParams', 'searchService',
        function($scope, $state, $stateParams, searchService) {       
            $scope.init = function(){
            	angular.element(document).scrollTo(0, 0, 700);
            	$scope.$parent.homeTab = "active";
            }
        }
    ]);
})(window.angular);