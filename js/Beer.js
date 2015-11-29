var Beer = (function () {

    var spriteName = 'beer';

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName);
        Game.addToHitList(this);

        var timer = new PowerUpTimer(10);

        this.action = function() {
            //Marius

            startSound();
            startFilter();
            startBuff();
        };

        this.undo = function() {
            //Marius

            stopSound();
            stopFilter();
            stopBuff();
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
            // Verschwommenheits effekt startet
        };

        var stopFilter = function() {
            // Verschwommenheits effekt entfernen
        };

        var startBuff = function() {
            // Marius
            //snake.speed verlangsamen
            // Heighscore erhöhen
        };

        var stopBuff = function() {
            // Marius
            //snake.speed wieder auf normal setzen.
            // Heighscore erhöhen
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