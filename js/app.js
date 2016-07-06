var browserKey = 'AIzaSyDx5tEfNkixUSvbt9PQReDDJLZI16P4Fmk';
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

var app = angular.module('youtube', ['imgLoader', 'spinner', 'videoItem','ui.router']);
