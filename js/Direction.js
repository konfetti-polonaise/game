var Direction = (function () {

    // constructor
    var cls = function () {
        var xDistance;
        var yDistance;

        this.isRight = function() {
            return xDistance == 1;
        };
        this.isLeft = function() {
            return xDistance == -1;
        };
        this.isDown = function() {
            return yDistance == 1;
        };
        this.isUp = function() {
            return yDistance == -1;
        };
        this.setRight = function() {
            xDistance = 1;
            yDistance = 0;
        };
        this.setLeft = function() {
            xDistance = -1;
            yDistance = 0;
        };
        this.setDown = function() {
            xDistance = 0;
            yDistance = 1;
        };
        this.setUp = function() {
            xDistance = 0;
            yDistance = -1;
        };
        this.getXDistance = function() {
            return xDistance;
        };
        this.getYDistance = function() {
            return yDistance;
        };
        this.equals = function(_direction) {
            return this.getXDistance() == _direction.getXDistance()
                && this.getYDistance() == _direction.getYDistance();
        };

        // :(
        this.setRight();
    };

    return cls;
})();