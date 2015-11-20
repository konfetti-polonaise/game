var Game = (function () {
    var snake;
    var wall;
    var cursor;
    var nextDirection;
    var gridSize = 32;

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
        wall = new Wall(128 + 16, 16);
        cursor = KonfettiPolonaise.getPhaser().input.keyboard.createCursorKeys();
    };

    cls.prototype.update = function() {
        // @TODO: auslagern
        var i = snake.getSpeed();
        while(i--) {
            handleDirectionChange();
            snake.move();
        }

        // @TODO: Hitdetection Snake mit sich selber.
        // @TODO: action() von Wall und Dancer programmieren.
        // @TODO: Powerups programmieren
        // @TODO: Hitdetektion mit Powerups.
        // @TODO: Animation etc....

    };

    cls.hitTest = function(_obj1, _obj2) {
        var dx = _obj1.getX() - _obj2.getX();
        var dy = _obj1.getY() - _obj2.getY();

        return Math.sqrt((dx * dx) + (dy * dy)) < gridSize; // TODO: An Spritegröße anpassen
    };

    cls.loadSpritesheets = function(_cls) {
        var spritesheets = _cls.getSpritesheets();

        for(var i = 0; i < spritesheets.length; i++) {
            var sprite = spritesheets[i];
            KonfettiPolonaise.getPhaser().load.spritesheet(sprite, 'assets/img/' + sprite + '.png', 32, 32);
        }
    };

    var checkInput = function () {
        if (cursor.right.isDown) {
            return 'R';

        } else if (cursor.left.isDown) {
            return 'L';

        } else if (cursor.up.isDown) {
            return 'U';

        } else if (cursor.down.isDown) {
            return 'D';
        }

        return nextDirection;
    };

    var handleDirectionChange = function() {
        nextDirection = checkInput();
        if(isSnakeinGrid()) {
            snake.changeDirection(nextDirection);
        }
    };

    var isSnakeinGrid = function() {
        return (snake.getX() + gridSize / 2) % gridSize == 0 && (snake.getY() + gridSize / 2) % gridSize == 0;
    };

    return cls;
})();