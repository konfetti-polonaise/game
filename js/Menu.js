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

        spacebar = KonfettiPolonaise.getPhaser().input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
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