var Game = (function () {
    var snake;
    var cursor;
    var gridSize = 32;
    var hitList;   // Liste mit beruehrbaren Elementen
    var delList;   // Liste aller DisplayElemente des Spiels

    var powerUp;   // aktuelles PowerUp auf dem Spielfeld
    var allPowerUps; // Liste mit allen im Spiel erscheinbaren PowerUp-Klassen
    var powerUpChance;
    var powerUpChanceInit = 14;

    var filterManager;
    var wholeScreen;

    var wasd;

    var backgroundSound;
    var startSound;

    // constructor
    var cls = function() {};


    cls.prototype.preload = function() {
        cls.loadSpritesheets(Dancer);
        cls.loadSpritesheets(Head, 40);
        cls.loadSpritesheets(JeTaime);
        cls.loadSpritesheets(Chilli);
        cls.loadSpritesheets(Beer);
        KonfettiPolonaise.load.image('playground', 'assets/img/playground.png');
        KonfettiPolonaise.load.image('grid', 'assets/img/grid.png');
    };

    cls.prototype.create = function() {

        // Hintergrundbild
        var playground = KonfettiPolonaise.add.image(0, 0, 'playground');

        // Rasterlinien, die ausfaden
        var gridLines = KonfettiPolonaise.add.image(0, 0, 'grid');
        gridLines.alpha = 1;
        KonfettiPolonaise.add.tween(gridLines).to(
            {alpha: 0},
            15000,
            Phaser.Easing.Linear.None,
            true
        );

        Score.reset();
        Highscore.hideRanking();
        KonfettiPolonaise.hideCredits();

        wholeScreen = KonfettiPolonaise.add.sprite(20, 20);
        wholeScreen.texture.baseTexture.skipRender = false;         //workaround, da phaser immer die letzte texture rendert
        wholeScreen.width =  KonfettiPolonaise.width-40;
        wholeScreen.height = KonfettiPolonaise.height-40;

        filterManager = new FilterManager();

        hitList = [];
        delList = [];

        snake = new Snake();

        powerUp = null;

        KonfettiPolonaise.input.enabled = true;
        cursor = KonfettiPolonaise.input.keyboard.createCursorKeys();
        Game.placeRandomDisplayElement(new Dancer(0, 0, false), true);

        // Tastatur
        wasd = {
            up: KonfettiPolonaise.input.keyboard.addKey(Phaser.Keyboard.W),
            down: KonfettiPolonaise.input.keyboard.addKey(Phaser.Keyboard.S),
            left: KonfettiPolonaise.input.keyboard.addKey(Phaser.Keyboard.A),
            right: KonfettiPolonaise.input.keyboard.addKey(Phaser.Keyboard.D)
        };

        resetPowerUpChance();

        allPowerUps = [
            JeTaime,
            Chilli,
            Beer
        ];  // Welche PowerUps erscheinen koennen.

        startSound.play();
    };

    cls.prototype.update = function() {

        updateSnake();

        snake.decreaseBuffTimer();

        updatePowerUp();

        filterManager.update();
    };

    // Muss jedesmal ausgefuehrt werden wenn ein DisplayElement erstellt wird!
    cls.bringToTopWholeScreen= function() {
        wholeScreen.bringToTop();
    };

    // Initialisiert alle Sounds von Game. muss von KonfettiPolonaise ausgefuehrt werden wegen gegenseitigen Ladeabheangigkeiten.
    cls.createSounds = function() {
        backgroundSound = KonfettiPolonaise.createSound('assets/sound/laCucaracha.mp3');
        backgroundSound.loop = true;

        // TODO: Mexican Music (Mariachi)  sollte fließend in Hauptmusik uebergehen             LAURIN
        startSound = KonfettiPolonaise.createSound('assets/sound/bottlePop.mp3');
        startSound.onended = function () {
            backgroundSound.play()
        };
    };

    cls.playBackgroundSound = function() {
        backgroundSound.play();
    };

    cls.pauseBackgroundSound = function() {
        backgroundSound.pause();
    };

    cls.setBackgrundSoundSpeed = function(_speed) {
        backgroundSound.playbackRate = _speed;
    };


    cls.playStartSound = function() {
        startSound.play();
    };

    cls.pauseStartSound = function() {
        startSound.pause();
    };

    cls.startSoundIsPlaying = function() {
        return (!startSound.paused && startSound.currentTime > 0 && !startSound.ended);
    };


    var resetSounds = function() {
        backgroundSound.pause();
        backgroundSound.load();
        startSound.pause();
        startSound.load();

        var i = allPowerUps.length;
        while(i--) {
            allPowerUps[i].resetSound();
        }
    };

    cls.hitTestPos = function(_obj, _x, _y, _hitboxWidth, _hitBoxHeight) {
        var dx = Math.abs(_obj.getX() - _x); // deltaX
        var dy = Math.abs(_obj.getY() - _y); // deltaY

        dx = roundXdecimal(dx, 2); // mathematisches Runden, weil
        dy = roundXdecimal(dy, 2); // JS nicht vernuenftig mit Fliesskommazahlen umgehen kann.

        if(dx >= dy) {
            return dx < (_obj.getHitboxWidth() / 2 + _hitboxWidth / 2);
        } else {
            return dy < (_obj.getHitboxHeight() / 2 + _hitBoxHeight / 2);
        }
    };

    cls.hitTest = function(_obj1, _obj2) {
        return cls.hitTestPos(_obj1, _obj2.getX(), _obj2.getY(), _obj2.getHitboxWidth(), _obj2.getHitboxHeight());
    };

    cls.loadSpritesheets = function(_cls, _height, _width) {
        var spritesheets = _cls.getSpritesheets();

        var height = gridSize;
        if (_height !== undefined) {
            height = _height
        }

        var width = height;
        if (_width !== undefined) {
            width = _width
        }

        for(var i = 0; i < spritesheets.length; i++) {
            var sprite = spritesheets[i];
            KonfettiPolonaise.load.spritesheet(sprite, 'assets/img/' + sprite + '.png', height, width);
        }
    };

    cls.getDelList = function () {
        return delList;
    };


    var checkInput = function () {
        var cursorDirection = new Direction();

        if (cursor.right.isDown || wasd.right.isDown) {
            cursorDirection.setRight();
            return cursorDirection;

        } else if (cursor.left.isDown || wasd.left.isDown) {
            cursorDirection.setLeft();
            return cursorDirection;

        } else if (cursor.up.isDown || wasd.up.isDown) {
            cursorDirection.setUp();
            return cursorDirection;

        } else if (cursor.down.isDown || wasd.down.isDown) {
            cursorDirection.setDown();
            return cursorDirection;

        }
        return null;   // Falls keine Taste gedrueckt ist.
    };




    /** PRIVATE. Fuehrt eine komplette Schlangenbewegung durch.
     * Testet dabei ob es Kollisionen gibt und behandelt diese.
     */
    var updateSnake = function() {

        var i = snake.getSpeed();
        while(i--) {
            snake.step();
            snake.addNextDirection(checkInput());
            testCollisions();
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

        xValue = roundXdecimal(xValue, 2);   // mathematisches Runden, weil
        yValue = roundXdecimal(yValue, 2);   // JS nicht vernuenftig mit Fliesskommazahlen umgehen kann.

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
        snake.addToPassingList(del);
    };

    cls.removeFromPassingList = function(del) {
        snake.removeFromPassingList(del);
    };

    var testCollisions = function() {

        // Collisionen mit anderen Objekten auf dem Spielfeld
        var i = hitList.length;
        while(i--) {
            if(Game.hitTest(snake, hitList[i])) {
                hitList[i].action();
            }
        }

        // Collision von Schlangenkopf mit Schlangenkörper
        var bodyCollision = snake.getBodyCollision();
        if(bodyCollision != null) {
            bodyCollision.action();
        }

        // Collision von Schlangenkopf mit den AussenWaenden
        if (isOutsideRoom(snake)) {
            Game.gameOver();
        }
    };

    var isOutsideRoom = function (_del) {
        var isOutside = false;

        if (_del.getX() > KonfettiPolonaise.width - gridSize ||
            _del.getX() < gridSize ||
            _del.getY() > KonfettiPolonaise.height - gridSize ||
            _del.getY() < gridSize ) {
            isOutside = true;
        }

        return isOutside;
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

    cls.gameOver = function() {
        resetSounds();
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
        if(powerUp != null) {
            if(powerUp.onFieldIsOver()) {
                Game.removePowerUp();
            }
            else {
                powerUp.decreaseOnFieldTimer();
            }
        }
    };

    var resetPowerUpChance = function() {
        powerUpChance = powerUpChanceInit;
    };

    var increasePowerUpChance = function() {
        if(powerUpChance > 1) {
            powerUpChance--;
        }
    };

    cls.spawnPowerUp = function() {
        if(cls.spawnPowerUp.caller == null) { // Cheatschutz
            return false;

        }

        if(powerUp == null) {
            // 1 aus 1 bis PowerUpChance
            if(getRandomValue(1, powerUpChance) == 1) {
                powerUp = new allPowerUps[getRandomValue(0, allPowerUps.length - 1)](0, 0);  // Ein zufaelliges PowerUp erstellen
                Game.placeRandomDisplayElement(powerUp);
                resetPowerUpChance();
            }

            increasePowerUpChance();
        }
    };

    /**
     * Prüft ob sich das übergebene Objekt an einer freien Stelle befindet
     * @param _x
     * @param _y
     * @returns boolean true, wenn Position frei ist
     */
    cls.isFreePosition = function(_x, _y) {
        var i = delList.length;
        var halfGrid = gridSize / 2;

        while(i--) {
            if(cls.hitTestPos(delList[i], _x, _y, halfGrid, halfGrid)) {
                return false;
            }
        }

        if (powerUp != null && Game.hitTestPos(powerUp, _x, _y, halfGrid, halfGrid)) {
            return false;
        }

        return true;
    };

    cls.placeRandomDisplayElement = function(del, rotate) {
        // plaziert element an zufaelliger stelle wenn da kein hit ist.
        var x, y;

        do {
            x = getRandomValue(1, (KonfettiPolonaise.width / gridSize) - 2);
            y = getRandomValue(1, (KonfettiPolonaise.height / gridSize) - 2);

            x = x * gridSize + gridSize / 2;
            y = y * gridSize + gridSize / 2;

        } while(Game.isFreePosition(x, y) == false);

        del.setX(x);
        del.setY(y);

        if(rotate === true) {
            del.setRotation(getRandomValue(1, 5) * 90);
        }
    };

    cls.addToDisplayList = function(del) {
        addToList(delList, del);
    };


    return cls;
})();


function getRandomValue(min, max){
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomFloat(min, max){
    return Math.random() * (max - min) + min;
}

