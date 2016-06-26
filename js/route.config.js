app.config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true)
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            views: {
                "header": {
                    templateUrl: "js/modules/header/header.html"
                },
                "footer": {
                    templateUrl: "js/modules/footer/footer.html"
                }
            }
        })
        .state('home.searchVideos', {
            url: "/",
            views: {
                'main@': {
                    templateUrl: 'js/modules/searchVideos/searchVideos.html',
                    controller: 'youtubeController'
                }
            }
        });
    $locationProvider.html5Mode(true);
})
