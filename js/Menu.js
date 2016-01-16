var Menu = (function () {
    var spacebar;

    // constructor
    var cls = function () {

    };

    cls.prototype.preload = function () {

    };

    cls.prototype.create = function () {
        document.getElementById("menu").className = "display";

        document.getElementById("start").onclick = function() {
            Menu.startGame();
            return false;
        };

        document.getElementById("showranking").onclick = function() {
            Highscore.displayRanking();
            return false;
        };

        document.getElementById("showcredits").onclick = function() {
            KonfettiPolonaise.showCredits();
            return false;
        };

        spacebar = KonfettiPolonaise.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    };

    cls.prototype.update = function () {
        if (spacebar.isDown) {
            Menu.startGame();
        }
    };

    cls.startGame = function () {
        document.getElementById("menu").className = "hide";

        KonfettiPolonaise.startGame();
    };

    return cls;
})();