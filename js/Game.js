var Game = (function () {
    var snake;
    var wall;
    var cursor;
    var gridSize = 32;
    var hitList = [];

    // constructor
    var cls = function () {

    };

    cls.prototype.preload = function() {
        cls.loadSpritesheets(Dancer);
        cls.loadSpritesheets(Head);
        cls.loadSpritesheets(Wall);
    };

    cls.prototype.create = function() {
        wall = new Wall(128 + 16, 16);

        snake = new Snake();

        cursor = KonfettiPolonaise.getPhaser().input.keyboard.createCursorKeys();

        new Dancer(128 + 16, 128 + 16);
    };

    cls.prototype.update = function() {
        // @TODO: auslagern
        var i = snake.getSpeed();
        while(i--) {
            snake.step();
            handleDirectionChange();

            testCollisions();
            //console.log(cls.hitTest(snake, wall));
        }




        // @TODO: Hitdetection Snake mit sich selber.
        // @TODO: action() von Wall und Dancer programmieren.
        // @TODO: Powerups programmieren
        // @TODO: Hitdetektion mit Powerups.
        // @TODO: Animation etc....

    };


    cls.hitTest = function(_obj1, _obj2) {
        var dx = Math.abs(_obj1.getX() - _obj2.getX());
        var dy = Math.abs(_obj1.getY() - _obj2.getY());

        if(dx > dy) {
            return dx < (_obj1.getHitboxWidth() / 2 + _obj2.getHitboxWidth() / 2);
        } else {
            return dy < (_obj1.getHitboxHeight() / 2 + _obj2.getHitboxHeight() / 2);
        }
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
            return new Direction(1, 0);

        } else if (cursor.left.isDown) {
            return new Direction(-1, 0);

        } else if (cursor.up.isDown) {
            return new Direction(0, -1);

        } else if (cursor.down.isDown) {
            return new Direction(0, 1);
        }

        return null;   // Falls keine Taste gedrückt ist.
    };


    /** Prüft ob eine Richtungsänderung getätigt wird und gibt dies an Snake zur Speicherung im Buffer weiter.
     */
    var handleDirectionChange = function() {

        snake.setNextDirection(checkInput());
    };


    cls.isInGrid = function(del) {
        return (del.getX() + gridSize / 2) % gridSize == 0 && (del.getY() + gridSize / 2) % gridSize == 0;
    };

    cls.getGridSize = function() {
        return gridSize;
    };

    cls.addToHitList = function(del) {
        hitList.push(del);
    };

    cls.removeFromHitList = function(del) {
        var i = hitList.length;
        while(i--) {
            if(hitList[i] === del) {
                hitList.splice(i, 1);
            }
        }
    };

    var testCollisions = function() {
        var i = hitList.length;
        while(i--) {
            if(Game.hitTest(snake, hitList[i])) {
                hitList[i].action();
            }
        }
    };

    cls.random = function(min, max) {
        return Math.floor((Math.random() * max) + min);
    };

    return cls;
})();