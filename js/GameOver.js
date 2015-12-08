var GameOver = (function () {

    // constructor
    var cls = function () {

    };

    cls.prototype.preload = function () {
    };

    cls.prototype.create = function () {
        // Auskommentiert, damit Spielsituation noch sichtbar ist.
        /*var gameover = KonfettiPolonaise.getPhaser().add.text(400, 200, 'GAME OVER', { font: 'bold 50px Courier, monospace', fill: '#fff'});
        gameover.anchor.set(0.5);

        var text = KonfettiPolonaise.getPhaser().add.text(400, 300, 'RESTART', { font: 'bold 40px Courier, monospace', fill: '#fff'});
        text.anchor.set(0.5);
        text.inputEnabled = true;*/

        // HTML anpassung
        document.getElementById("gameover").className = "display";
        document.getElementById("final-score").innerHTML = Score.getScore();

        text.events.onInputDown.add(cls.restartGame, this);
    };

    cls.restartGame = function() {
        // HTML anpassung
        document.getElementById("gameover").className = "hide";

        KonfettiPolonaise.startGame();
    };

    return cls;
})();