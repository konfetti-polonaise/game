var Head = (function () {
    var spriteName = 'snake-head';

    // constructor
    var cls = function (_x, _y) {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(�)).
        this.constructor.super.call(this, _x, _y, spriteName);

        // Animationen
        this.addAnimation('walk', [0], 10, true);
        this.playAnimation('walk');

        var direction = new Direction();
        this.setRotation(direction.getRotation());

        this.changeDirection = function(_direction) {

            if(direction.equals(_direction) === false) {
                direction = _direction;
                this.setRotation(direction.getRotation());
            }
        };

        this.getDirection = function() {
            return direction;
        };
    };

    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();