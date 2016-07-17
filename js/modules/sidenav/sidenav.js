(function(angular) {
    youtubeApp.controller('sidenavController', ['$scope', '$state', '$stateParams', '$rootScope',
        function($scope, $state, $stateParams, $rootScope) {       
            $scope.init = function(){
            	if($rootScope.isMobile || $rootScope.isTablet){
                    $rootScope.sidenavMargin = "side-nav-margin-off";
                }else{
                    $rootScope.sidenavMargin = "side-nav-margin-on";
                }
            }
        }
    ]);
})(window.angular);