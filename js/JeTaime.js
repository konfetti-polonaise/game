var JeTaime = (function () {

    var spriteName = 'jeTaime';

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        /*DEBUG
        var nr = JeTaime.getInstanceNr();
        console.log("Create JetaimeNr:" + nr);
        */

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

            //DEBUG
            //console.log("action() JetaimeNr:" + nr);

            buffTimer = new PowerUpTimer(1000); // TODO: Muss noch genau auf 10s gemacht werden

            Game.removePowerUp();

            var oldBuff = snake.getBuff();

            /*DEBUG
            if (null != oldBuff) {
                console.log("oldBuff JetaimeNr:" + nr + " = JetaimeNr " + oldBuff.getNr());
            }
            else{
                console.log("oldBuff JetaimeNr:" + nr + " = JetaimeNr NICHTS");
            }
            */

            if(null != oldBuff) {   // wenn es noch einen aktiven buff gibt
                oldBuff.undo();
            }

            originalSpeed = snake.getSpeed();

            //DEBUG
            //console.log("originalSpeed JetaimeNr:" + nr + " = " + originalSpeed);

            startBuff();
            startSound();
            startFilter();

            snake.addBuff(this);
        };


        /** Macht alle auswirkungen dieses Powerups wieder rueckgaengig.
         */
        this.undo = function() {

            //DEBUG
            //console.log("Undo() JetaimeNr:" + nr);

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
            // Pinker effekt startet

            //Score.setMultiplierColor("F24DD1");
            document.getElementById("multiplierFull").style.color = "#BF358C";     // Dirty Way
        };

        var stopFilter = function() {
            filterManager.removeActiveFilters(wholeScreen);

            //Score.setMultiplierColor(null);
            document.getElementById("multiplierFull").style.color = "";     // Dirty Way
        };

        var startBuff = function() {
            Score.setMultiplier( Score.getMultiplier() / multiplierDivident );
            snake.setSpeed(slowSpeed);
        };

        var stopBuff = function() {
            snake.setSpeed(originalSpeed);
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