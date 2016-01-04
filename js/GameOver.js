var GameOver = (function () {
    var spacebar;

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

        spacebar = KonfettiPolonaise.getPhaser().input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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