var GameOver = (function () {

    // constructor
    var cls = function () {

    };

    cls.prototype.preload = function () {
    };

    cls.prototype.create = function () {
        // HTML anpassung
        document.getElementById("gameover").className = "display";

    };



    return cls;
})();