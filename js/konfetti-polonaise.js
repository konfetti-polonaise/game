var KonfettiPolonaise = (function () {

    // constructor
    var cls = function () {

        // private
        var direction = {x:0, y:0};

        var setDirection = function(x, y) {
            direction.x = x;
            direction.y = y;
        };

        // public (this instance only)
        this.getDirection = function () {
            return direction;
        };

        this.setDirectionLeft = function() {
            setDirection(-1, 0);
        };

        this.setDirectionRight = function() {
            setDirection(1, 0);
        };

    };

    return cls;
})();
