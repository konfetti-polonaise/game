var Snake = (function () {
    // constructor
    var cls = function () {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this);

        // private
        var speed;

        // public (this instance only)
        this.getSpeed = function () {
            return speed;
        };

        this.setSpeed = function (_speed) {
            speed = _speed;
        };
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();