window.registerSwipe = (element, direction, handler) => {
    const TOUCH_DISTANCE_DELTA = 50;

    var xDown = null;
    var yDown = null;

    element.addEventListener("touchstart", handleTouchStart, false);
    element.addEventListener("touchmove", handleTouchMove, false);
    element.addEventListener("touchend", handleTouchEnd, false);

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchEnd() {
        xDown = null;
        yDown = null;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        switch (direction) {
            case 'left':
                if (xDiff > TOUCH_DISTANCE_DELTA) {
                    handler();
                    xDown = null;
                    yDown = null;
                }
                break;

            case 'right':
                if (-1 * xDiff > TOUCH_DISTANCE_DELTA ) {
                    handler();
                    xDown = null;
                    yDown = null;
                }
                break;

            case 'up':
                if (yDiff > TOUCH_DISTANCE_DELTA) {
                    handler();
                    xDown = null;
                    yDown = null;
                }
                break;

            case 'down':
                if (-1 * yDiff > TOUCH_DISTANCE_DELTA) {
                    handler();
                    xDown = null;
                    yDown = null;
                }
                break;
                
        }
    }
};
