// Extracted scroll-fire from materialize-angular https://krescruz.github.io/angular-materialize/

(function(angular) {
    youtubeApp.directive("scrollFire", ["$compile", "$timeout", function($compile, $timeout) {
        return {
            restrict: "A",
            scope: {
                offset: "@",
                scrollFire: "&"
            },
            link: function(scope, element, attrs) {
                var offset = scope.offset;
                if (!angular.isDefined(scope.offset)) {
                    offset = 0;
                }
                offset = Number(offset) || 0;


                var fired = false;
                var handler = throttle(function() {
                    if (fired) {
                        return;
                    }
                    var windowScroll = window.pageYOffset + window.innerHeight;

                    var elementOffset = element[0].getBoundingClientRect().top + window.pageYOffset;

                    if (windowScroll > (elementOffset + offset)) {
                        fired = true;
                        scope.scrollFire({});
                        stop();
                    }
                }, 100);

                function stop() {
                    angular.element(window).off("scroll resize blur focus", handler);
                }

                angular.element(window).on("scroll resize blur focus", handler);
                handler();

                scope.$on('$destroy', stop);
            }
        };
    }]);

    // The throttle function from underscore: https://github.com/jashkenas/underscore/blob/master/underscore.js
    function throttle(func, wait) {
        var timeout, context, args, result;
        var previous = 0;

        var later = function() {
            previous = +new Date();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };

        var throttled = function() {
            var now = +new Date();
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };

        throttled.cancel = function() {
            clearTimeout(timeout);
            previous = 0;
            timeout = context = args = null;
        };

        return throttled;
    };

})(window.angular);
