var GameOver = (function () {

    // constructor
    var cls = function () {

    };

    cls.prototype.preload = function () {
    };

    cls.prototype.create = function () {

        // HTML anpassung
        document.getElementById("gameover").className = "display";
        document.getElementById("final-score").innerHTML = Score.getScore();

        // Keine Ahnung was diese Zeile macht, aber ohne sie funktionierts es nicht,
        // dass die GameStage weiterhin im Hintergrund zu sehen ist.
        text.events.onInputDown.add(cls.restartGame, this);
    };

    cls.restartGame = function() {
        // HTML anpassung
        document.getElementById("gameover").className = "hide";

        KonfettiPolonaise.startGame();
    };

    return cls;
})();