var DisplayElement = (function () {

    // constructor
    var cls = function (_x, _y, _spritesheet) {
        // private
        var sprite = KonfettiPolonaise.getPhaser().add.sprite(_x, _y, _spritesheet);
        sprite.pivot.x = sprite.width / 2;
        sprite.pivot.y = sprite.height / 2;

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
            return sprite;
        };
        this.addAnimation = function(_name, _frames, _fps, _loop) {
           sprite.animations.add(_name, _frames, _fps, _loop);
        };
        this.playAnimation = function(_name) {
            sprite.animations.play(_name);
        };
    };

    // public (shared across instances)
    cls.prototype = {

    };

    return cls;
})();
