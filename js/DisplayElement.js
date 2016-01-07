var DisplayElement = (function () {

    // constructor
    var cls = function (_x, _y, _sprite, fadeIn) {
        // private
        var sprite;
        var tween;

        if(_sprite instanceof Object) {
            sprite = _sprite;
        } else {
            sprite = KonfettiPolonaise.getPhaser().add.sprite(_x, _y, _sprite);
            sprite.pivot.x = sprite.width / 2;
            sprite.pivot.y = sprite.height / 2;
        }

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
            return sprite.angle;
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
            sprite.angle = _rotation;
        };
        this.getSpriteName = function() {
            return sprite.key;
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
        this.addAnimation = function(_name, _frames, _fps, _loop) {
            sprite.animations.add(_name, _frames, _fps, _loop);
        };
        this.playAnimation = function(_name) {
            sprite.animations.play(_name);
        };

        var shake = function(rotation, callBack) {
            tween = KonfettiPolonaise.getPhaser().add.tween(sprite);
            tween.to(rotation, 300, Phaser.Easing.Linear.None);
            tween.onComplete.addOnce(callBack, this);
            tween.start();
        };
        var shakeLeft = function() {
            shake({rotation: sprite.rotation - 0.6}, shakeRight);
        };
        var shakeRight = function() {
            shake({rotation: sprite.rotation + 0.6}, shakeLeft);
        };
        this.startShaking = function() {
            shake({rotation: sprite.rotation - 0.3}, shakeRight);
        };
        this.stopShaking = function() {
            tween.stop();
        };

        this.moveUp = function() {
            sprite.moveUp();
        };

        this.moveDown = function() {
            sprite.moveDown();
        };

        // Ganz nach vorne
        this.bringToTop = function() {
            sprite.bringToTop();
        };

        // Ganz nach hinten
        this.sendToBack = function() {
            sprite.sendToBack();
        };

        /** Entfernt den Sprite des DisplayElements. es wird also unsichbar.
         */
        this.destroySprite = function() {
            sprite.destroy();
        }

    };

    // public (shared across instances)
    cls.prototype = {

    };

    return cls;
})();
