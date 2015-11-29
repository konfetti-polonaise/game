var JeTaime = (function () {

    var spriteName = 'jeTaime';

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        var timer = new PowerUpTimer(1000); // TODO: Muss noch genau auf 10s gemacht werden

        this.setHitboxHeight(20);
        this.setHitboxWidth(20);

        var snake;
        var originalSpeed;

        this.action = function() {

            snake = Game.getSnake();
            var oldBuff = snake.getBuff();

            if(null != oldBuff) {   // wenn oldBuff nicht leer ist
                oldBuff.undo();
            }

            originalSpeed = snake.getSpeed();

            startSound();
            startFilter();
            startBuff();

            snake.addBuff(this);
            Game.removeFromHitList(this);
            Game.removePowerUp();
        };

        /** Macht alle auswirkungen dieses Powerups wieder rueckgaengig.
         */
        this.undo = function() {

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
            snake.setSpeed(7);
        };

        var stopBuff = function() {
            snake.setSpeed(originalSpeed);
        };

    };


    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();