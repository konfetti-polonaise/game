var DisplayElement = (function () {

    // constructor
    var cls = function (_x, _y, _spritesheet, fadeIn) {
        // private
        var sprite = KonfettiPolonaise.getPhaser().add.sprite(_x, _y, _spritesheet);
        sprite.pivot.x = sprite.width / 2;
        sprite.pivot.y = sprite.height / 2;

        var hitboxHeight = Game.getGridSize();
        var hitboxWidth = hitboxHeight;

        if(fadeIn == true) {
            sprite.alpha = 0;
            KonfettiPolonaise.getPhaser().add.tween(sprite).to(
                {alpha: 1},
                1000,
                Phaser.Easing.Linear.None,
                true
            );
        }

        // public (this instance only)
        this.getX = function () {
            return sprite.x;
        };
        this.getY = function () {
            return sprite.y;
        };
        this.getRotation = function () {
            return sprite.rotation;
        };
        this.getHitboxHeight = function() {
            return hitboxHeight;
        };
        this.getHitboxWidth = function() {
            return hitboxWidth;
        };

        this.setX = function (_x) {
            sprite.x = _x;
        };
        this.setY = function (_y) {
            sprite.y = _y;
        };
        this.setRotation = function (_rotation) {
            sprite.rotation = _rotation;
        };
        this.getSpriteName = function() {
            return sprite.name;
        };
        this.addAnimation = function(_name, _frames, _fps, _loop) {
           sprite.animations.add(_name, _frames, _fps, _loop);
        };
        this.playAnimation = function(_name) {
            sprite.animations.play(_name);
        };
        this.setHitboxHeight = function(_height) {
            hitboxHeight = _height;
        };
        this.setHitboxWidth = function(_width) {
            hitboxWidth = _width;
        };
        this.setHitbox = function(_width, _height) {
            this.setHitboxWidth(_width);
            this.setHitboxHeight(_height);
        };

    };

    // public (shared across instances)
    cls.prototype = {

    };

    return cls;
})();
