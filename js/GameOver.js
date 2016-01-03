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
        document.getElementById("restart").onclick = function() {
            GameOver.restartGame();
            return false;
        };
    };

    cls.restartGame = function() {
        // HTML anpassung
        document.getElementById("gameover").className = "hide";

        KonfettiPolonaise.startGame();
    };

    return cls;
})();