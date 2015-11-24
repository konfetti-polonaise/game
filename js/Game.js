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
        KonfettiPolonaise.getPhaser().load.image('playground', 'assets/img/playground.png');
    };

    cls.prototype.create = function() {

        var playground = KonfettiPolonaise.getPhaser().add.image(0, 0, 'playground');

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
        var cursorDirection = new Direction();

        if (cursor.right.isDown) {
            cursorDirection.setRight();
            return cursorDirection;

        } else if (cursor.left.isDown) {
            cursorDirection.setLeft();
            return cursorDirection;

        } else if (cursor.up.isDown) {
            cursorDirection.setUp();
            return cursorDirection;

        } else if (cursor.down.isDown) {
            cursorDirection.setDown();
            return cursorDirection;
        }

        return null;   // Falls keine Taste gedrückt ist.
    };


    /** Prüft ob eine Richtungsänderung getätigt wird und gibt dies an snake zur Speicherung im Buffer weiter.
     */
    var handleDirectionChange = function() {

        snake.setNextDirection(checkInput());
    };


    /** Gibt zurück ob sich ein DisplayElement im Grid,
     * also exakt auf einem der Felder des definierten Rasters befindet.
     * @param del
     * @returns TRUE wenn sich das Element im Raster befindet.
     */
    cls.isInGrid = function(del) {
        var xValue = (del.getX() + gridSize / 2);   // Position errechnen
        var yValue = (del.getY() + gridSize / 2);

        xValue = (Math.round(xValue * 100) / 100);  // mathematisches Runden, weil
        yValue = (Math.round(yValue * 100) / 100);  // JS nicht vernünftig mit Fließkommazahlen umgehen kann.

        return (xValue % gridSize == 0 && yValue % gridSize == 0);    // Berechnung ob Position im Grid ist
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