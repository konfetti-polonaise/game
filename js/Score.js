var Score = (function () {

    var score = 0;
    var initialMulti = 10;
    var multiplier = initialMulti;

    //Constructor
    var cls = function() {};


    cls.increaseScore = function() {
        score = score + multiplier;
        displayScore();
    };

    cls.resetScore = function() {
        score = 0;
        displayScore();
    };

    cls.retrurnScore = function(){
        return score;
    };

    var displayScore = function() {
        document.getElementById("score").innerHTML = score;
    };


    cls.getMultiplier = function() {
        return multiplier / initialMulti;
    };

    cls.setMultiplier = function(_multiplier) {
        multiplier = _multiplier * initialMulti;
        displayMultiplier();
    };

    cls.resetMultiplier = function() {
        multiplier = initialMulti;
        displayMultiplier();
    };

    var displayMultiplier = function() {
        document.getElementById("multiplier").innerHTML = Score.getMultiplier() + "x";
    };


    // Aendert die Farbe des Multiplikators. Bei Parameter NULL wird zurueck aufs Inintial gesetzt.
    cls.setMultiplierColor = function(_color) {

        if(_color = null) {
            _color = "";
        }

        document.getElementById("multiplier").style.color = _color;  // TODO: warum funktioniert das nicht mit einem Paramenter ?!
    };


    cls.reset = function() {
        Score.resetScore();
        Score.resetMultiplier();
    };

    return cls;
})();