var JeTaime = (function () {

    var spriteName = 'jeTaime';

    var backgroundSound = KonfettiPolonaise.createSound('assets/sound/jeTaime.mp3');
    backgroundSound.loop = true;

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        this.sendToBack();
        this.moveUp();

        var veryEarly = false;  // Sonderfall: wenn this eingesammelt wurde bevor der startSound von Game zuende ist.

        var buffTimer;  // Wirkungszeit

        // Wie lange das PowerUp auf dem Feld bleibt bevor es unaufgesammelt verschwindet
        var onFieldTimer = new PowerUpTimer(1000);

        var slowSpeed = 7;
        var originalSpeed;

        var multiplierDivident = 2;

        this.setHitboxHeight(20);
        this.setHitboxWidth(20);

        var snake = Game.getSnake();
        var filterManager = Game.getFilterManager();
        var wholeScreen = Game.getWholeScreen();

        this.action = function() {

            buffTimer = new PowerUpTimer(1013);

            Game.removePowerUp();

            var oldBuff = snake.getBuff();

            if(null != oldBuff) {   // wenn es noch einen aktiven buff gibt
                oldBuff.undo();
            }

            originalSpeed = snake.getSpeed();

            startBuff();
            startSound();
            startFilter();

            snake.addBuff(this);
        };


        /** Macht alle auswirkungen dieses Powerups wieder rueckgaengig.
         */
        this.undo = function() {

            snake.removeBuff();

            stopSound();
            stopFilter();
            stopBuff();
        };


        this.buffIsOver = function() {
            return buffTimer.isOver();
        };

        this.decreaseBuffTimer = function() {
            buffTimer.decrease();
        };

        this.onFieldIsOver = function() {
            return onFieldTimer.isOver();
        };

        this.decreaseOnFieldTimer = function() {
            onFieldTimer.decrease();
        };

        var startSound = function() {
            veryEarly = Game.startSoundIsPlaying();

            // Sonderfall
            if(veryEarly) {
                Game.pauseStartSound();
            }
            else{
                Game.pauseBackgroundSound();
            }

            backgroundSound.play();
        };

        var stopSound = function() {
            JeTaime.resetSound();

            // Sonderfall
            if(veryEarly) {
                Game.playStartSound();
            }
            else{
                Game.playBackgroundSound();
            }
        };

        var startFilter = function() {
            // Pinker effekt startet

            document.getElementById("multiplierFull").className = "jeTaimePink";
        };

        var stopFilter = function() {
            filterManager.removeActiveFilters(wholeScreen);

            Score.resetMultiplierColor();
        };

        var startBuff = function() {
            Score.setMultiplier( Score.getMultiplier() / multiplierDivident );
            snake.setSpeed(slowSpeed);
        };

        var stopBuff = function() {
            snake.setSpeed(originalSpeed);
            Score.resetMultiplier();
        };

    };


    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    cls.resetSound = function() {
        backgroundSound.pause();
        backgroundSound.load();  // reset auf Anfang
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();