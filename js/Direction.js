var Direction = (function () {

    // constructor
    var cls = function (_x, _y) {
        var xDistance = _x || 0;
        var yDistance = _y || 0;

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
        this.getRotation = function() {
            if(this.isRight()) {
                return 0;
            }
            else if(this.isLeft()) {
                return 180;
            }
            else if(this.isDown()) {
                return 90;
            }
            else if(this.isUp()) {
                return 270;
            }
        };
        this.equals = function(_direction) {
            return xDistance == _direction.getXDistance()
                && yDistance == _direction.getYDistance();
        };

        // Wenn Richtung nicht schon gesetzt wurde
        if(xDistance == 0 && yDistance == 0) {
            this.setRight();
        }

    };

    return cls;
})();