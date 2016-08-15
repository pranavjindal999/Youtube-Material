var youtubeApi = null;

// initializing google api for youtube..

function init() {
    gapi.client.setApiKey(browserKey);
    youtubeApi = gapi.client.load('youtube', 'v3');
    // bootstraping angular after gapi is loaded..
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['youtube']);
    });
}

var youtubeApp = angular.module('youtube', ['ngTouch', 'ui.router', 'duScroll']);

youtubeApp.config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlRouterProvider.otherwise("/");   
    $stateProvider
        .state('home', {
            url: "/",
            views: {
                "header": {
                    templateUrl: "src/js/modules/header/header.html",
                    controller: 'headerController'
                },
                "main": {
                    templateUrl: "src/js/modules/homePage/homePage.html",
                    controller: 'homePageController'
                },
                "sidenav": {
                    templateUrl: "src/js/modules/sidenav/sidenav.html",
                    controller: 'sidenavController'
                },
                "footer": {
                    templateUrl: "src/js/modules/footer/footer.html"
                }
            }
        })
        .state('home.searchVideos', {
            url: "search?query&pageToken",
            views: {
                'main@': {
                    templateUrl: 'src/js/modules/searchVideos/searchVideos.html',
                    controller: 'youtubeController'
                }
            }
        })
        .state('home.videoPage', {
            url: "video/:id",
            views: {
                'main@': {
                    templateUrl: 'src/js/modules/videoPage/videoPage.html',
                    controller: 'videoPageController'
                }
            }
        })
        .state('home.channelPage', {
            url: "channel/:id",
            views: {
                'main@': {
                    templateUrl: 'src/js/modules/channelPage/channelPage.html',
                    controller: 'channelPageController'
                }
            }
        })
        .state('home.trending', {
            url: "trending/:category?pageToken",
            views: {
                'main@': {
                    templateUrl: 'src/js/modules/trendingPage/trendingPage.html',
                    controller: 'trendingPageController'
                }
            }
        })
        .state('home.channelPage.home', {
            url: "/home",
            templateUrl: 'src/js/modules/channelPage/channelPageHome/channelPageHome.html',
            controller: 'channelPageHomeController'
        })
        .state('home.channelPage.videos', {
            url: "/videos",
            templateUrl: 'src/js/modules/channelPage/channelPageVideos/channelPageVideos.html',
            controller: 'channelPageVideosController'
        })
        .state('home.channelPage.channels', {
            url: "/channels",
            templateUrl: 'src/js/modules/channelPage/channelPageChannels/channelPageChannels.html',
            controller: 'channelPageChannelsController'
        })
        .state('home.channelPage.about', {
            url: "/about",
            templateUrl: 'src/js/modules/channelPage/channelPageAbout/channelPageAbout.html',
            controller: 'channelPageAboutController'
        });

    $locationProvider.html5Mode(true);
   
}])

NProgress.configure({ showSpinner: false });


var autolinker = new Autolinker({
    urls: {
        schemeMatches: true,
        wwwMatches: true,
        tldMatches: true
    },
    email: true,
    phone: false,
    twitter: false,
    hashtag: 'twitter',

    stripPrefix: false,
    newWindow: true,

    truncate: {
        length: 0,
        location: 'end'
    }
});