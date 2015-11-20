var Head = (function () {
    var spriteName = 'snake-head';

    // constructor
    var cls = function (_x, _y) {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this, _x, _y, spriteName);
        this.addAnimation('walk', [0, 1], 10, true);
        this.playAnimation('walk');
    };

    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();