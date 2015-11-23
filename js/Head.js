var Head = (function () {
    var spriteName = 'snake-head';

    // constructor
    var cls = function (_x, _y) {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(�)).
        this.constructor.super.call(this, _x, _y, spriteName);
        this.addAnimation('walk', [0, 1], 10, true);
        this.playAnimation('walk');

        var direction = new Direction();

        this.changeDirection = function(_direction) {
            var changed = false;

            if(_direction.isRight() && !direction.isLeft()) {
                direction.setRight();
                changed = true;
            }
            else if(_direction.isLeft() && !direction.isRight()) {
                direction.setLeft();
                changed = true;
            }
            else if(_direction.isDown() && !direction.isUp()) {
                direction.setDown();
                changed = true;
            }
            else if(_direction.isUp() && !direction.isDown()) {
                direction.setUp();
                changed = true;
            }

            if(changed) {
                this.setRotation(direction.getRotation());
            }
        };

        this.getDirection = function() {
            return direction;
        }
    };

    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();