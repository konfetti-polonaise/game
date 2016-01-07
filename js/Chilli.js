var Chilli = (function () {

    var spriteName = 'chilli';

    var actionSound = KonfettiPolonaise.createSound('assets/sound/bottlePop.mp3');  //TODO: Stichflammen-Geraeusch     Laurin

    var soundSpeeds = [1.15, 1.45, 1.7];

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        this.sendToBack();
        this.moveUp();

        var buffTimer;  // Wirkungszeit

        // Wie lange das PowerUp auf dem Feld bleibt bevor es unaufgesammelt verschwindet
        var onFieldTimer = new PowerUpTimer(1000);

        var speedBoost = 15;
        var numberOfChillis = 1; // Die wie vielte Chilli in Folge THIS ist, ohne dass der Buff zwischendurch nachgelassen hat.

        this.setHitboxHeight(20);
        this.setHitboxWidth(20);

        var snake = Game.getSnake();
        var filterManager = Game.getFilterManager();
        var wholeScreen = Game.getWholeScreen();

        this.action = function() {

            buffTimer = new PowerUpTimer(1000);

            Game.removePowerUp();

            var oldBuff = snake.getBuff();

            if(null != oldBuff) {   // wenn es noch einen aktiven buff gibt

                if(oldBuff instanceof Chilli) {
                    numberOfChillis = numberOfChillis + oldBuff.getNumberOfChillis();
                    if(numberOfChillis > 3) {
                        numberOfChillis = 3;    // Multiplikator-Obergrenze
                    }
                }

                oldBuff.undo();
            }

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
            actionSound.play();
            Game.setBackgrundSoundSpeed( soundSpeeds[numberOfChillis-1] );
        };

        var stopSound = function() {
            Chilli.resetSound();
        };

        var startFilter = function() {
            filterManager.addFireFilter(wholeScreen);

            document.getElementById("multiplierFull").className = "chilliRed";
        };

        var stopFilter = function() {
            filterManager.removeActiveFilters(wholeScreen);

            Score.resetMultiplierColor();
        };

        var startBuff = function() {
            Score.setMultiplier( Score.getMultiplier() * Math.pow(2, numberOfChillis) );
            snake.setSpeed( snake.getSpeed() + numberOfChillis * speedBoost );
        };

        var stopBuff = function() {
            snake.setSpeed( snake.getSpeed() - numberOfChillis * speedBoost );
            Score.resetMultiplier();
        };

        this.getNumberOfChillis = function() {
            return numberOfChillis;
        };

    };


    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    cls.resetSound = function() {
        actionSound.pause();
        actionSound.load();
        Game.setBackgrundSoundSpeed(1);
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();