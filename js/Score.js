var Score = (function () {

    var score = 0;
    var initialMulti = 10;
    var multiplier = initialMulti;

    //Constructor
    var cls = function() {};


    cls.increaseScore = function() {
        if(cls.increaseScore.caller != null) {
            score = score + multiplier;
        }

        displayScore();
    };

    cls.resetScore = function() {
        score = 0;
        displayScore();
    };

    cls.getScore = function() {
        return score;
    };

    var displayScore = function() {
        document.getElementById("score").innerHTML = score;
    };


    cls.getMultiplier = function() {
        return multiplier / initialMulti;
    };

    cls.setMultiplier = function(_multiplier) {
        if(cls.setMultiplier.caller != null) {
            multiplier = _multiplier * initialMulti;
        }
        displayMultiplier();
    };

    cls.resetMultiplier = function() {
        multiplier = initialMulti;
        displayMultiplier();
    };

    var displayMultiplier = function() {
        document.getElementById("multiplier").innerHTML = Score.getMultiplier() + "x";
    };


    cls.resetMultiplierColor = function() {
        document.getElementById("multiplierFull").className = "";
    };


    cls.reset = function() {
        Score.resetScore();
        Score.resetMultiplier();
        Score.resetMultiplierColor();
    };

    return cls;
})();