(function(angular) {
    youtubeApp.controller('sidenavController', ['$scope', '$state', '$stateParams', '$rootScope',
        function($scope, $state, $stateParams, $rootScope) {
            $scope.init = function() {
                if ($rootScope.isMobile || $rootScope.isTablet) {
                    $rootScope.sidenavMargin = "side-nav-margin-off";
                    $rootScope.sidenavLeft = "sidenav-off";
                    $rootScope.isSideNavOn = false;
                } else {
                    $rootScope.sidenavMargin = "side-nav-margin-on";
                    $rootScope.sidenavLeft = "sidenav-on";
                    $rootScope.isSideNavOn = true;
                }

                $rootScope.toggleSidenav = function() {
                    if ($rootScope.isSideNavOn) {
                        $rootScope.sidenavMargin = "side-nav-margin-off";
                        $rootScope.sidenavLeft = "sidenav-off";
                        $rootScope.isSideNavOn = false;
                    } else {
                        $rootScope.sidenavMargin = "side-nav-margin-on";
                        $rootScope.sidenavLeft = "sidenav-on";
                        $rootScope.isSideNavOn = true;
                    }
                }
            }
        }
    ]);
})(window.angular);
