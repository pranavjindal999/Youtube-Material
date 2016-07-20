youtubeApp.config(function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true)
    $urlRouterProvider.otherwise("/search");

    $stateProvider
        .state('home', {
            views: {
                "header": {
                    templateUrl: "js/modules/header/header.html",
                    controller: 'headerController'
                },
                "sidenav": {
                    templateUrl: "js/modules/sidenav/sidenav.html",
                    controller: 'sidenavController'
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
            url: "/video/:id",
            views: {
                'main@': {
                    templateUrl: 'js/modules/videoPage/videoPage.html',
                    controller: 'videoPageController'
                }
            }
        })
        .state('home.channelPage', {
            url: "/channel/:id",
            views: {
                'main@': {
                    templateUrl: 'js/modules/channelPage/channelPage.html',
                    controller: 'channelPageController'
                }
            }
        })
        .state('home.channelPage.home', {
            url: "/home",
            templateUrl: 'js/modules/channelPage/channelPageHome/channelPageHome.html',
            controller: 'channelPageHomeController'
        })
        .state('home.channelPage.videos', {
            url: "/videos",
            templateUrl: 'js/modules/channelPage/channelPageVideos/channelPageVideos.html',
            controller: 'channelPageVideosController'
        })
        .state('home.channelPage.channels', {
            url: "/channels",
            templateUrl: 'js/modules/channelPage/channelPageChannels/channelPageChannels.html',
            controller: 'channelPageChannelsController'
        })
        .state('home.channelPage.about', {
            url: "/about",
            templateUrl: 'js/modules/channelPage/channelPageAbout/channelPageAbout.html',
            controller: 'channelPageAboutController'
        });
    $locationProvider.html5Mode(true);

    NProgress.configure({ showSpinner: false });
})
