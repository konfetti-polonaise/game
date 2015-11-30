var JeTaime = (function () {

    var spriteName = 'jeTaime';

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        /*DEBUG
        var nr = JeTaime.getInstanceNr();
        console.log("Create JetaimeNr:" + nr);
        */

        var timer;  // Wirkungszeit

        var slowSpeed = 7;

        this.setHitboxHeight(20);
        this.setHitboxWidth(20);

        var snake = Game.getSnake();
        var originalSpeed;

        this.action = function() {

            //DEBUG
            //console.log("action() JetaimeNr:" + nr);

            timer = new PowerUpTimer(1000); // TODO: Muss noch genau auf 10s gemacht werden

            Game.removeFromHitList(this);
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

            startSound();
            startFilter();
            startBuff();

            snake.addBuff(this);
        };

        /** Macht alle auswirkungen dieses Powerups wieder rueckgaengig.
         */
        this.undo = function() {

            //DEBUG
            //console.log("Undo() JetaimeNr:" + nr);

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
            snake.setSpeed(slowSpeed);
        };

        var stopBuff = function() {
            snake.setSpeed(originalSpeed);
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