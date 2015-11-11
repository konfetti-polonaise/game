var Touchable = (function () {
    // constructor
    var cls = function () {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this);

        // public (this instance only)
        this.action = function () {
            return null;
        };
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();