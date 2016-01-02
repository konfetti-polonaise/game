var Beer = (function () {

    var spriteName = 'beer';

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        /*DEBUG
         var nr = Beer.getInstanceNr();
         console.log("Create BeerNr:" + nr);
         */

        var buffTimer;  // Wirkungszeit

        // Wie lange das PowerUp auf dem Feld bleibt bevor es unaufgesammelt verschwindet
        var onFieldTimer = new PowerUpTimer(1000);

        var multiplierFactor = 2;

        this.setHitboxHeight(20);
        this.setHitboxWidth(20);

        var snake = Game.getSnake();
        var filterManager = Game.getFilterManager();
        var wholeScreen = Game.getWholeScreen();

        this.action = function() {

            //DEBUG
            //console.log("action() BeerNr:" + nr);

            buffTimer = new PowerUpTimer(1000); // TODO: Muss noch genau auf 10s gemacht werden

            Game.removePowerUp();

            var oldBuff = snake.getBuff();

            /*DEBUG
             if (null != oldBuff) {
             console.log("oldBuff BeerNr:" + nr + " = BeerNr " + oldBuff.getNr());
             }
             else{
             console.log("oldBuff BeerNr:" + nr + " = BeerNr NICHTS");
             }
             */

            if(null != oldBuff) {   // wenn es noch einen aktiven buff gibt
                oldBuff.undo();
            }

            //DEBUG
            //console.log("originalSpeed BeerNr:" + nr + " = " + originalSpeed);

            startBuff();
            startSound();
            startFilter();

            snake.addBuff(this);
        };


        /** Macht alle auswirkungen dieses Powerups wieder rueckgaengig.
         */
        this.undo = function() {

            //DEBUG
            //console.log("Undo() BeerNr:" + nr);

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
            filterManager.addPlasmaFilter(wholeScreen);

            //Score.setMultiplierColor("F24DD1");
            document.getElementById("multiplierFull").style.color = "#022C03";     // Dirty Way
        };

        var stopFilter = function() {
            filterManager.removeActiveFilters(wholeScreen);

            //Score.setMultiplierColor(null);
            document.getElementById("multiplierFull").style.color = "";     // Dirty Way
        };

        var startBuff = function() {
            Score.setMultiplier( Score.getMultiplier() * multiplierFactor );
        };

        var stopBuff = function() {
            Score.resetMultiplier();
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