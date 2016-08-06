(function(angular) {
    youtubeApp.directive('comment', function() {
        return {
            restrict: 'E',
            scope: {
                comment: "="
            },
            templateUrl: 'src/js/directives/comment/comment.html',
            controller: ['$scope', '$sce', function($scope, $sce) {

                if ($scope.comment.snippet.topLevelComment.snippet.publishedAt == $scope.comment.snippet.topLevelComment.snippet.updatedAt)
                    $scope.isEdited = true;
                else
                    $scope.isEdited = false;

                $scope.comment.snippet.topLevelComment.snippet.updatedAtFull = moment($scope.comment.snippet.topLevelComment.snippet.updatedAt).format('h:mm:ss A, MMMM Do YYYY');
                $scope.comment.snippet.topLevelComment.snippet.updatedAt = moment($scope.comment.snippet.topLevelComment.snippet.updatedAt).fromNow();
                $scope.comment.snippet.topLevelComment.snippet.textDisplay = $sce.trustAsHtml($scope.comment.snippet.topLevelComment.snippet.textDisplay);

                if ($scope.comment.replies) {
                    for (var i = 0; i < $scope.comment.replies.comments.length; i++) {
                        $scope.comment.replies.comments[i].snippet.textDisplay = $sce.trustAsHtml($scope.comment.replies.comments[i].snippet.textDisplay);
                        $scope.comment.replies.comments[i].snippet.updatedAtFull =  moment($scope.comment.replies.comments[i].snippet.updatedAt).format('h:mm:ss A, MMMM Do YYYY');
                        $scope.comment.replies.comments[i].snippet.updatedAt = moment($scope.comment.replies.comments[i].snippet.updatedAt).fromNow();
                    }
                }
            }]

        };
    });
})(window.angular);