(function(angular) {
    angular.module('spinner', []).directive('spinner', function() {
        return {
            restrict: 'E',
            templateUrl: 'js/spinner/spinner.html',
        };
    });
})(window.angular);