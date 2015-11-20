var Game = (function () {
    var snake;
    var wall;

    // constructor
    var cls = function () {

    };

    cls.prototype.preload = function() {
        cls.loadSpritesheets(Dancer);
        cls.loadSpritesheets(Head);
        cls.loadSpritesheets(Wall);
    };

    cls.prototype.create = function() {
        snake = new Snake();
        wall = new Wall(100, 16);

        console.log(Game.hitTest(snake, wall));
    };

    cls.hitTest = function(_obj1, _obj2) {
        var dx = _obj1.getX() - _obj2.getX();
        var dy = _obj1.getY() - _obj2.getY();

        var distance = Math.sqrt((dx * dx) + (dy * dy));

        return distance < 32;
    };

    cls.loadSpritesheets = function(_cls) {
        var spritesheets = _cls.getSpritesheets();

        for(var i = 0; i < spritesheets.length; i++) {
            var sprite = spritesheets[i];
            KonfettiPolonaise.getPhaser().load.spritesheet(sprite, 'assets/img/' + sprite + '.png', 32, 32);
        }
    };

    return cls;
})();