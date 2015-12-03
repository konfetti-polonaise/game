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
        return multiplier;
    };

    cls.setMultiplier = function(_multiplier) {
        multiplier = _multiplier;
        displayMultiplier();
    };

    cls.resetMultiplier = function() {
        Score.setMultiplier(initialMulti);
    };

    var displayMultiplier = function() {
        var temp = roundXdecimal(multiplier / 10 , 1);
        document.getElementById("multiplier").innerHTML = temp;
    };

    cls.reset = function() {
        Score.resetScore();
        Score.resetMultiplier();
    };

    return cls;
})();