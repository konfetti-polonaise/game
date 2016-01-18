var Beer = (function () {

    var spriteName = 'beer';

    var actionSound = KonfettiPolonaise.createSound('assets/sound/bottlePop.mp3');

    var cls = function (_x, _y) {
        this.constructor.super.call(this, _x, _y, spriteName, true);
        Game.addToHitList(this);

        this.sendToBack();
        this.moveUp();

        var buffTimer;  // Wirkungszeit

        // Wie lange das PowerUp auf dem Feld bleibt bevor es unaufgesammelt verschwindet
        var onFieldTimer = new PowerUpTimer(1000);

        var multiplierFactor = 1.5;

        this.setHitbox(20,20);

        var snake = Game.getSnake();
        var filterManager = Game.getFilterManager();
        var wholeScreen = Game.getWholeScreen();

        this.action = function() {

            buffTimer = new PowerUpTimer(1000);

            Game.removePowerUp();

            var oldBuff = snake.getBuff();


            if(null != oldBuff) {   // wenn es noch einen aktiven buff gibt
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
        };

        var stopSound = function() {
            Beer.resetSound();
        };

        var startFilter = function() {
            filterManager.addDrunkFilter(Game.getDelList());

            //Score.setMultiplierColor("F24DD1");
            document.getElementById("multiplierFull").className = "beerGreen";
            document.getElementsByTagName('html')[0].className = "drunk";
        };

        var stopFilter = function() {
            filterManager.removeActiveFilters(Game.getDelList());

            Score.resetMultiplierColor();
        };

        var startBuff = function() {
            Score.setMultiplier( Score.getMultiplier() * multiplierFactor );
        };

        var stopBuff = function() {
            Score.resetMultiplier();
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
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();