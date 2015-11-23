var Head = (function () {
    var spriteName = 'snake-head';

    // constructor
    var cls = function (_x, _y) {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this, _x, _y, spriteName);
        this.addAnimation('walk', [0, 1], 10, true);
        this.playAnimation('walk');

        var direction = new Direction();

        this.changeDirection = function(_direction) {
            switch (_direction) {
                case 'R':
                    if(!direction.isLeft()) {
                        direction.setRight();
                        this.setRotation(0);
                    }
                    break;
                case 'L':
                    if(!direction.isRight()) {
                        direction.setLeft();
                        this.setRotation(180);
                    }
                    break;
                case 'D':
                    if(!direction.isUp()) {
                        direction.setDown();
                        this.setRotation(90);
                    }
                    break;
                case 'U':
                    if(!direction.isDown()) {
                        direction.setUp();
                        this.setRotation(270);
                    }
                    break;
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