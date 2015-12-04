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


    cls.reset = function() {
        Score.resetScore();
        Score.resetMultiplier();
    };

    return cls;
})();