(function(angular) {
    youtubeApp.controller('sidenavController', ['$scope', '$state', '$stateParams', '$rootScope',
        function($scope, $state, $stateParams, $rootScope) {
            $scope.init = function() {
                if ($rootScope.isMobile || $rootScope.isTablet) {
                    $rootScope.sidenavMargin = "side-nav-margin-off";
                    $rootScope.sidenavLeft = "sidenav-off";
                } else {
                    $rootScope.sidenavMargin = "side-nav-margin-on";
                    $rootScope.sidenavLeft = "sidenav-oN";
                }

                $rootScope.toggleSidenav = function() {
                    if ($rootScope.sidenavMargin != "side-nav-margin-off") {
                        $rootScope.sidenavMargin = "side-nav-margin-off";
                        $rootScope.sidenavLeft = "sidenav-off";
                    } else {
                        $rootScope.sidenavMargin = "side-nav-margin-on";
                        $rootScope.sidenavLeft = "sidenav-on";
                    }
                }
            }
        }
    ]);
})(window.angular);
