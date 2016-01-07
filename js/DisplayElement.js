var DisplayElement = (function () {

    // constructor
    var cls = function (_x, _y, _sprite, fadeIn) {
        // private
        var sprite;
        var shakeTween;
        var scaleTween;

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
                500,
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
            shakeTween = KonfettiPolonaise.getPhaser().add.tween(sprite);
            shakeTween.to(rotation, 800, Phaser.Easing.Linear.None);
            shakeTween.onComplete.addOnce(callBack, this);
            shakeTween.start();
        };
        var zoom = function(scale, callBack) {
            scaleTween = KonfettiPolonaise.getPhaser().add.tween(sprite.scale);
            scaleTween.to(scale, 1000, Phaser.Easing.Linear.None);
            scaleTween.onComplete.addOnce(callBack, this);
            scaleTween.start()
        };
        var shakeLeft = function() {
            shake({rotation: sprite.rotation - 0.4}, shakeRight);
        };
        var shakeRight = function() {
            shake({rotation: sprite.rotation + 0.4}, shakeLeft);
        };
        var zoomIn = function() {
            zoom({x: 1.2, y: 1.2}, zoomOut);
        };
        var zoomOut = function() {
            zoom({x: 1.1, y: 1.1}, zoomIn);
        };
        this.startShaking = function() {
            shake({rotation: sprite.rotation - 0.2}, shakeRight);
            zoomIn();
        };
        this.stopShaking = function() {
            scaleTween.stop();
            sprite.scale.setTo(1, 1);
            shakeTween.stop();
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
        };


        Game.addToDisplayList(this);
    };

    // public (shared across instances)
    cls.prototype = {

    };

    return cls;
})();
