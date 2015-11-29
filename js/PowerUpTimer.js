var PowerUpTimer = (function () {

    var time;

    // constructor
    var cls = function (_time) {

        if(_time > 0) time = _time;

        this.isOver = function() {
            return time <= 0;
        };
gh
        this.decrease = function() {
            time--;
        };
    };

    return cls;
})();