app.config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true)
    $urlRouterProvider.otherwise("/search");
    $stateProvider
        .state('home', {
            views: {
                "header": {
                    templateUrl: "js/modules/header/header.html",
                    controller: 'headerController'
                },
                "footer": {
                    templateUrl: "js/modules/footer/footer.html"
                }
            }
        })
        .state('home.searchVideos', {
            url: "/search?query&pageToken",
            views: {
                'main@': {
                    templateUrl: 'js/modules/searchVideos/searchVideos.html',
                    controller: 'youtubeController'
                }
            }
        })
        .state('home.videoPage', {
            url: "/watch?id",
            views: {
                'main@': {
                    templateUrl: 'js/modules/videoPage/videoPage.html',
                    controller: 'videoPageController'
                }
            }
        });
    $locationProvider.html5Mode(true);
})
