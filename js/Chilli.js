var Chilli = (function () {

    var spriteName = 'chilli';

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        /*DEBUG
         var nr = Chilli.getInstanceNr();
         console.log("Create ChilliNr:" + nr);
         */

        var timer;  // Wirkungszeit

        var speedBoost = 15;

        this.setHitboxHeight(20);
        this.setHitboxWidth(20);

        var snake = Game.getSnake();

        this.action = function() {

            //DEBUG
            //console.log("action() ChilliNr:" + nr);

            timer = new PowerUpTimer(1000); // TODO: Muss noch genau auf 10s gemacht werden

            Game.removeFromHitList(this);
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

                if(oldBuff instanceof Chilli) { //Wenn dieser eine Chilli ist, speed doppelt erhoehen

                    speedBoost = speedBoost + oldBuff.getSpeedBoost();
                    oldBuff.undo();
                }
                else {
                    oldBuff.undo();
                }
            }

            startSound();
            startFilter();
            startBuff();

            snake.addBuff(this);
        };

        /** Macht alle auswirkungen dieses Powerups wieder rueckgaengig.
         */
        this.undo = function() {

            //DEBUG
            //console.log("Undo() ChilliNr:" + nr);

            stopSound();
            stopFilter();
            stopBuff();

            snake.removeBuff();
        };

        this.isOver = function() {
            return timer.isOver();
        };

        this.decreaseTimer = function() {
            timer.decrease();
        };

        var startSound = function() {
            //  Einsammel-Soundeffekt abspielen, und eventuell Musik verändern
        };

        var stopSound = function() {
            // eventuell veraenderte Musik wieder auf normal setzen.
        };

        var startFilter = function() {
            // Pinker effekt startet
        };

        var stopFilter = function() {
            // Pinker effekt entfernen
        };

        var startBuff = function() {
            snake.setSpeed( snake.getSpeed() + speedBoost );
        };

        var stopBuff = function() {
            snake.setSpeed( snake.getSpeed() - speedBoost );
        };

        this.getSpeedBoost = function() {
            return speedBoost;
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