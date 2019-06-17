window.registerSwipe = (element, direction, handler) => {
    var xDown = null;
    var yDown = null;

    element.addEventListener("touchstart", handleTouchStart, false);
    element.addEventListener("touchmove", handleTouchMove, false);

    function handleTouchStart(evt) {
        xDown = evt.touches[0].clientX;
        yDown = evt.touches[0].clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }
        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0 && direction === "left") {
                handler(evt);
            } else if (direction === "right") {
                handler(evt);
            }
        } else {
            if (yDiff > 0 && direction === "up") {
                handler(evt);
            } else if (direction === "down") {
                handler(evt);
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }
};
