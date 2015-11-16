var DisplayElement = (function () {

    // constructor
    var cls = function () {
        // private
        var x = 0,
            y = 0,
            rotation;

        // public (this instance only)
        this.getX = function () {
            return x;
        };
        this.getY = function () {
            return y;
        };
        this.getRotation = function () {
            return rotation;
        };

        this.setX = function (_x) {
            x = _x;
        };
        this.setY = function (_y) {
            y = _y;
        };
        this.setRotation = function (_direction) {
            rotation = _direction;
        };
    };

    // public (shared across instances)
    cls.prototype = {

    };

    return cls;
})();