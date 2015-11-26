var Game = (function () {
    var snake;
    var wall;
    var cursor;
    var gridSize = 32;
    var hitList = [];
    var passingList = [];

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

        snake = new Snake();

        cursor = KonfettiPolonaise.getPhaser().input.keyboard.createCursorKeys();

        // Test: Mehrere einsammelbare Dancer
        new Dancer(128 + 16, 32 + 16);
        new Dancer(128 + 16, 128 + 16);
        new Dancer(128 + 16, 256 + 16);
        new Dancer(128 + 16, 384 + 16);

        new Dancer(256 + 16, 32 + 16);
        new Dancer(256 + 16, 256 + 16);
        new Dancer(256 + 16, 128 + 16);
        new Dancer(256 + 16, 384 + 16);

        new Dancer(384 + 16, 32 + 16);
        new Dancer(384 + 16, 256 + 16);
        new Dancer(384 + 16, 128 + 16);
        new Dancer(384 + 16, 384 + 16);

        new Dancer(512 + 16, 32 + 16);
        new Dancer(512 + 16, 256 + 16);
        new Dancer(512 + 16, 128 + 16);
        new Dancer(512 + 16, 384 + 16);

        new Dancer(640 + 16, 32 + 16);
        new Dancer(640 + 16, 256 + 16);
        new Dancer(640 + 16, 128 + 16);
        new Dancer(640 + 16, 384 + 16);
    };

    cls.prototype.update = function() {

        updateSnake();

        // @TODO: Hitdetection Snake mit sich selber.
        // @TODO: action() von Wall und Dancer programmieren.
        // @TODO: Powerups programmieren
        // @TODO: Hitdetektion mit Powerups.
        // @TODO: Animation etc....

    };

    /** STATIC. Rundet eine Fließkommazahl mathematisch auf 2 Dezimalstellen nach dem Komma ab.
     */
    cls.round2decimal = function(floatnumber) {
        return (Math.round(floatnumber * 100) / 100);
    };

    cls.hitTest = function(_obj1, _obj2) {
        var dx = Math.abs(_obj1.getX() - _obj2.getX()); // deltaX
        var dy = Math.abs(_obj1.getY() - _obj2.getY()); // deltaY

        dx = cls.round2decimal(dx); // mathematisches Runden, weil
        dy = cls.round2decimal(dy); // JS nicht vernuenftig mit Fliesskommazahlen umgehen kann.

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

    /** STATIC.
     */
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

        return null;   // Falls keine Taste gedrueckt ist.
    };


    /** Prueft ob eine Richtungsaenderung getaetigt wird und gibt dies an snake zur Speicherung im Buffer weiter.
     */
    var handleDirectionChange = function() {

        snake.setNextDirection(checkInput());
    };


    /** PRIVATE. Fuehrt eine komplette Schlangenbewegung durch.
     * Checkt dannach ob es Collisionen oder Verschwindene Objekte gibt und behandelt diese.
     */
    var updateSnake = function() {

        var i = snake.getSpeed();
        while(i--) {
            snake.step();
            handleDirectionChange();

            testCollisions();

            testPassings();
        }
    };


    /** Gibt zurueck ob sich ein DisplayElement im Grid,
     * also exakt auf einem der Felder des definierten Rasters befindet.
     * @param del
     * @returns TRUE wenn sich das Element im Raster befindet.
     */
    cls.isInGrid = function(del) {
        var xValue = (del.getX() + gridSize / 2);   // Position errechnen
        var yValue = (del.getY() + gridSize / 2);

        xValue = cls.round2decimal(xValue);   // mathematisches Runden, weil
        yValue = cls.round2decimal(yValue);   // JS nicht vernuenftig mit Fliesskommazahlen umgehen kann.

        return (xValue % gridSize == 0 && yValue % gridSize == 0);    // Berechnung ob Position im Grid ist
    };

    cls.getGridSize = function() {
        return gridSize;
    };

    var addToList = function(list, element) {
        list.push(element);
    };

    var removeFromList = function(list, element) {
        var i = list.length;
        while(i--) {
            if(list[i] === element) {
                list.splice(i, 1);
            }
        }
    };

    cls.addToHitList = function(del) {
        addToList(hitList, del);
    };

    cls.removeFromHitList = function(del) {
        removeFromList(hitList, del);
    };

    cls.addToPassingList = function(del) {
        addToList(passingList, del);
    };

    cls.removeFromPassingList = function(del) {
        removeFromList(passingList, del);
    };

    var testCollisions = function() {
        var i = hitList.length;
        while(i--) {
            if(Game.hitTest(snake, hitList[i])) {
                console.log('HIT');
                hitList[i].action();
            }
        }
    };

    var testPassings = function() {
        var i = passingList.length;

        while(i--) {
           if(!snake.isInside(passingList[i])) {
               passingList[i].action();
           }
        }
    };

    cls.random = function(min, max) {
        return Math.floor((Math.random() * max) + min);
    };

    cls.addToSnake = function(dancer) {
        snake.addFollower(dancer);
    };

    cls.increaseSpeed = function() {
        snake.increaseSpeed();
    };

    return cls;
})();