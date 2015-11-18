var Powerup = (function () {
    // constructor
    var cls = function () {
        var time;

        this.buff = function() {

        };
        this.debuff = function() {

        };
        this.decreaseTimer = function() {
            time --;
        };
        this.isTimeout = function() {
            return time <= 0;
        };
    };

    return cls;
})();