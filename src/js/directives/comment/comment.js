(function(angular) {
    youtubeApp.directive('comment', function() {
        return {
            restrict: 'E',
            scope: {
                comment: "="
            },
            templateUrl: 'js/directives/comment/comment.html',
            controller: ['$scope', '$sce', 'searchService', function($scope, $sce, searchService) {

                $scope.comment.snippet.topLevelComment.snippet.updatedAtFull = moment($scope.comment.snippet.topLevelComment.snippet.updatedAt).format('h:mm:ss A, MMMM Do YYYY');
                $scope.comment.snippet.topLevelComment.snippet.updatedAt = moment($scope.comment.snippet.topLevelComment.snippet.updatedAt).fromNow();
                $scope.comment.snippet.topLevelComment.snippet.textDisplay = $sce.trustAsHtml($scope.comment.snippet.topLevelComment.snippet.textDisplay);

                if ($scope.comment.replies) {
                    for (var i = 0; i < $scope.comment.replies.comments.length; i++) {
                        $scope.comment.replies.comments[i].snippet.textDisplay = $sce.trustAsHtml($scope.comment.replies.comments[i].snippet.textDisplay);
                        $scope.comment.replies.comments[i].snippet.updatedAtFull = moment($scope.comment.replies.comments[i].snippet.updatedAt).format('h:mm:ss A, MMMM Do YYYY');
                        $scope.comment.replies.comments[i].snippet.updatedAt = moment($scope.comment.replies.comments[i].snippet.updatedAt).fromNow();
                    }
                }

                try {
                    if (($scope.comment.snippet.totalReplyCount - $scope.comment.replies.comments.length) > 1)
                        $scope.replyText = 'Replies';
                    else
                        $scope.replyText = 'Reply';
                } catch (ignore) {}

                $scope.loadMoreReplies = function() {
                    var parameters = {
                        parentId: $scope.comment.id,
                        maxResults: $scope.moreRepliesNextPageToken ? 4 : 8,
                        pageToken: $scope.moreRepliesNextPageToken
                    }
                    $scope.moreRepliesSpinner = true;
                    searchService.getReplies(parameters).then(function(replies) {

                        for (var i = 0; i < replies.items.length; i++) {
                            replies.items[i].snippet.textDisplay = $sce.trustAsHtml(replies.items[i].snippet.textDisplay);
                            replies.items[i].snippet.updatedAtFull = moment(replies.items[i].snippet.updatedAt).format('h:mm:ss A, MMMM Do YYYY');
                            replies.items[i].snippet.updatedAt = moment(replies.items[i].snippet.updatedAt).fromNow();
                        }
                        if ($scope.moreRepliesNextPageToken)
                            $scope.comment.replies.comments = $scope.comment.replies.comments.concat(replies.items);
                        else
                            $scope.comment.replies.comments = $scope.comment.replies.comments.concat(replies.items.slice($scope.comment.replies.comments.length, replies.items.length));

                        $scope.moreRepliesNextPageToken = replies.nextPageToken;
                        if (($scope.comment.snippet.totalReplyCount - $scope.comment.replies.comments.length) > 1)
                            $scope.replyText = 'Replies';
                        else
                            $scope.replyText = 'Reply';
                        $scope.moreRepliesSpinner = false;
                    })
                }
            }]

        };
    });
})(window.angular);
