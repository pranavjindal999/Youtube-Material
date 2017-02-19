var youtubeApi = null;
var country = 'IN';

function init() {
    gapi.client.setApiKey(browserKey);
    youtubeApi = gapi.client.load('youtube', 'v3');
    angular.element(document).ready(function() {
        angular.bootstrap(document, ['youtube']);
    });
}

var youtubeApp = angular.module('youtube', ['ngTouch', 'ui.router', 'duScroll']);

youtubeApp.config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', '$locationProvider','$compileProvider', function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider, $compileProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlRouterProvider.otherwise("/");
    $locationProvider.html5Mode(true);
    $compileProvider.debugInfoEnabled(false);


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
                "videoBar": {
                    templateUrl: "js/modules/videoPage/videoPage.html",
                    controller: 'videoPageController'
                }
            }
        })
        .state('home.homePage', {
            url: "/",
            templateUrl: 'js/modules/homePage/homePage.html',
            controller: 'homePageController'
        })
        .state('home.searchVideos', {
            url: "/search?query&pageToken",
            templateUrl: 'js/modules/searchVideos/searchVideos.html',
            controller: 'youtubeController'
        })
        .state('home.videoPage', {
            url: "/video/:id"
        })
        .state('home.channelPage', {
            url: "/channel/:id",
            templateUrl: 'js/modules/channelPage/channelPage.html',
            controller: 'channelPageController',
            abstract:true
        })
        .state('home.trending', {
            url: "/trending/:category?pageToken",
            templateUrl: 'js/modules/trendingPage/trendingPage.html',
            controller: 'trendingPageController'
        })
        .state('home.about', {
            url: "/about/",
            templateUrl: 'js/modules/about/about.html'
        })
        .state('home.channelPage.home', {
            url: "",
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
}]);

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
