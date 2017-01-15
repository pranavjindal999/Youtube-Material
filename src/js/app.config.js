var youtubeApi = null;
var country = 'IN';
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
            views: {
                "header": {
                    templateUrl: "src/js/modules/header/header.html",
                    controller: 'headerController'
                },
                "sidenav": {
                    templateUrl: "src/js/modules/sidenav/sidenav.html",
                    controller: 'sidenavController'
                },
                "videoBar": {
                    templateUrl: "src/js/modules/videoPage/videoPage.html",
                    controller: 'videoPageController'
                }
            }
        })
        .state('home.homePage', {
            url: "/",
            templateUrl: 'src/js/modules/homePage/homePage.html',
            controller: 'homePageController'
        })
        .state('home.searchVideos', {
            url: "/search?query&pageToken",
            templateUrl: 'src/js/modules/searchVideos/searchVideos.html',
            controller: 'youtubeController'
        })
        .state('home.videoPage', {
            url: "/video/:id"
        })
        .state('home.channelPage', {
            url: "/channel/:id",
            templateUrl: 'src/js/modules/channelPage/channelPage.html',
            controller: 'channelPageController'
        })
        .state('home.trending', {
            url: "/trending/:category?pageToken",
            templateUrl: 'src/js/modules/trendingPage/trendingPage.html',
            controller: 'trendingPageController'
        })
        .state('home.about', {
            url: "/about/",
            templateUrl: 'src/js/modules/about/about.html'
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
