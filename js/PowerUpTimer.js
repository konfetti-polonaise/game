var PowerUpTimer = (function () {

    // constructor
    var cls = function (_time) {

        var time = 0;

        if(_time > 0) {time = _time;}

        this.isOver = function() {
            return time <= 0;
        };

        this.decrease = function() {
            time--;
        };

    };

    return cls;
})();