var Chilli = (function () {

    var spriteName = 'chilli';

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        /*DEBUG
         var nr = Chilli.getInstanceNr();
         console.log("Create ChilliNr:" + nr);
         */

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

            //DEBUG
            //console.log("action() ChilliNr:" + nr);

            buffTimer = new PowerUpTimer(1000); // TODO: Muss noch genau auf 10s gemacht werden

            Game.removePowerUp();

            var oldBuff = snake.getBuff();

            /*DEBUG
             if (null != oldBuff) {
             console.log("oldBuff ChilliNr:" + nr + " = ChilliNr " + oldBuff.getNr());
             }
             else{
             console.log("oldBuff ChilliNr:" + nr + " = ChilliNr NICHTS");
             }
             */

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

            //DEBUG
            //console.log("Undo() ChilliNr:" + nr);

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
            //  Einsammel-Soundeffekt abspielen, und eventuell Musik verändern
        };

        var stopSound = function() {
            // eventuell veraenderte Musik wieder auf normal setzen.
        };

        var startFilter = function() {
            filterManager.addFireFilter(wholeScreen);

            //Score.setMultiplierColor("940000");
            document.getElementById("multiplier").style.color = "#940000";     // Dirty Way
        };

        var stopFilter = function() {
            filterManager.removeActiveFilters(wholeScreen);

            //Score.setMultiplierColor(null);
            document.getElementById("multiplier").style.color = "";     // Dirty Way
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

        /*DEBUG
        this.getNr = function() {
            return nr;
        }
        */

    };

    /* DEBUG
     var instanceNr = 0;
     cls.getInstanceNr = function() {
     instanceNr++;
     return instanceNr;
     };
     */

    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();