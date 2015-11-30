var Game = (function () {
    var snake;
    var cursor;
    var gridSize = 32;
    var hitList = [];
    var passingList = [];   // Falscher Name. PassingList war für was anderes Spezifiziert. TODO: Umbenennen

    var powerUp = null;
    var allPowerUps;

    var filterManager;
    var wholeScreen;

    // test für tastatureingabe
    var key1;
    var key2;
    var key3;

    // constructor
    var cls = function () {

    };

    cls.prototype.preload = function() {
        cls.loadSpritesheets(Dancer);
        cls.loadSpritesheets(Head);
        cls.loadSpritesheets(Wall);
        cls.loadSpritesheets(JeTaime);
        cls.loadSpritesheets(Chilli);
        cls.loadSpritesheets(Beer);
        KonfettiPolonaise.getPhaser().load.image('playground', 'assets/img/playground.png');
    };

    cls.prototype.create = function() {

        var playground = KonfettiPolonaise.getPhaser().add.image(0, 0, 'playground');

        snake = new Snake();

        cursor = KonfettiPolonaise.getPhaser().input.keyboard.createCursorKeys();
        Game.placeRandomDisplayElement(new Dancer(0,0), true);
        

        wholeScreen = KonfettiPolonaise.getPhaser().add.sprite(20, 20);
        wholeScreen.texture.baseTexture.skipRender = false;         //workaround, da phaser immer die letzte texture rendert
        wholeScreen.width =  KonfettiPolonaise.getPhaser().width-40;
        wholeScreen.height = KonfettiPolonaise.getPhaser().height-40;

        filterManager = new FilterManager();

        //Tastatur
        //TODO refactor in kofnettiPoloniase klasse?
        key1 = KonfettiPolonaise.getPhaser().input.keyboard.addKey(Phaser.Keyboard.ONE);
        key2 = KonfettiPolonaise.getPhaser().input.keyboard.addKey(Phaser.Keyboard.TWO);
        key3 = KonfettiPolonaise.getPhaser().input.keyboard.addKey(Phaser.Keyboard.THREE);

        allPowerUps = [
            JeTaime, Chilli, Beer
        ];
    };

    cls.prototype.update = function() {

        updateSnake();
        snake.setNextDirection(checkInput());
        snake.decreaseBuffTimer();
        updatePowerUp();

        // @TODO: action() von Wall und Dancer programmieren.
        // @TODO: Powerups programmieren
        // @TODO: Hitdetektion mit Powerups.
        // @TODO: Animation etc....

       filterManager.update();

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

        // DEBUG
        else if (key1.isDown) {
            filterManager.removeActiveFilters(wholeScreen);

        } else if (key2.isDown) {
            filterManager.removeActiveFilters(wholeScreen);
            filterManager.addFireFilter(wholeScreen);

        } else if (key3.isDown) {
            filterManager.removeActiveFilters(wholeScreen);
            filterManager.addPlasmaFilter(wholeScreen);
        }
        // DEBUG END


        return null;   // Falls keine Taste gedrueckt ist.
    };


    /** PRIVATE. Fuehrt eine komplette Schlangenbewegung durch.
     * Checkt dannach ob es Collisionen oder Verschwindene Objekte gibt und behandelt diese.
     */
    var updateSnake = function() {

        var i = snake.getSpeed();
        while(i--) {
            snake.step();
            snake.setNextDirection(checkInput());

            testCollisions();

            testPassings();
        }
    };

    /** Damit die PowerUps leichter mit der Snake interagieren koennen.
     */
    cls.getSnake = function() {
        return snake;
    };

    /** Damit die PowerUps Filter benutzen koennen.
     */
    cls.getFilterManager = function() {
        return filterManager;
    };

    /** Damit die PowerUps Filter ueber den gesamten Bildschirm legen koennen.
     */
    cls.getWholeScreen = function() {
        return wholeScreen;
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
                hitList[i].action();
            }
        }

        var bodyCollision = snake.getBodyCollision();
        if(bodyCollision instanceof Dancer) {
            bodyCollision.action();
        }
    };

    var testPassings = function() {
        var i = passingList.length;

        while(i--) {
           if(!snake.isInside(passingList[i])) {
               passingList[i].queue();
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

    cls.gameOver = function(obj) {
        KonfettiPolonaise.gameOver();
    };

    /** Lässt das PowerUp auf dem Spielfeld verschwinden. wird aufgerufen wenn ein PowerUp eingesammelt wird.
     */
    cls.removePowerUp = function() {
        Game.removeFromHitList(powerUp);
        powerUp.destroySprite();
        powerUp = null;
    };

    /** Lässt, wenn es nicht schon eins gibt mit einer geringen Warscheinlichkeit ein zufälliges PowerUp erscheinen.
     * Wenn es bereits ein PowerUp auf dem Feld gibt, wird sein onFieldTimer runtergezaelt.
     * Wenn dieser 0 ist, verschwindet das PowerUp wieder vom Feld ohne dass es eingesammelt wurde.
     */
    var updatePowerUp = function() {

        if(powerUp == null) {

            if( getRandomFloat(1,201) > 200 ) {  // Geringe Warscheinlichkeit

                powerUp = new allPowerUps[getRandomValue(0, allPowerUps.length - 1)](0, 0);  // Ein zufaelliges PowerUp erstellen

                Game.placeRandomDisplayElement(powerUp);
            }
        }
        else{
            if(powerUp.onFieldIsOver()) {
                Game.removePowerUp();
            }
            else {
                powerUp.decreaseOnFieldTimer();
            }
        }
    };

    cls.placeRandomDisplayElement = function(del, rotate) {
        // plaziert element an zufaelliger stelle wenn da kein hit ist.
        var x, y, isHitted;

        var isFreePosition = true;
        do{
            x = getRandomValue(32, 800-32);
            y = getRandomValue(32, 512-32);
            x -= x%32;
            y -= y%32;
            del.setX(x+16);
            del.setY(y+16);

            var i = hitList.length;
            while(i--) {
                if(Game.hitTest(del, hitList[i])) {
                    isFreePosition = false;
                }
            }
        }while(isFreePosition != false);

        if(rotate === true) {
            del.setRotation(getRandomValue(1, 5) * 90);
        }
    };


    return cls;
})();

function getRandomValue(min, max){
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomFloat(min, max){
    return Math.random() * (max - min) + min;
}