var Wall = (function () {
    var spriteName = 'wall';

    // constructor
    var cls = function (_x, _y) {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this, _x, _y, spriteName);
    };

    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();