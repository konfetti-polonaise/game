var GameOver = (function () {
    var spacebar;

    // constructor
    var cls = function () {

    };

    cls.prototype.preload = function () {
    };

    cls.prototype.create = function () {
        var score = Score.getScore();
        new Highscore(score);

        Score.resetMultiplierColor();

        // HTML anpassung
        document.getElementById("gameover").className = "display";
        document.getElementById("final-score").innerHTML = score;
        document.getElementById("restart").onclick = function() {
            GameOver.restartGame();
            return false;
        };

        document.getElementById("displayranking").onclick = function() {
            Highscore.displayRanking();
            return false;
        };

        spacebar = KonfettiPolonaise.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };

    cls.prototype.update = function () {
        if (spacebar.isDown) {
            GameOver.restartGame();
        }
    };

    cls.restartGame = function() {
        // HTML anpassung
        document.getElementById("gameover").className = "hide";

        KonfettiPolonaise.startGame();
    };

    return cls;
})();