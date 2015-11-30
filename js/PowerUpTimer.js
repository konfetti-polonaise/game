var PowerUpTimer = (function () {

    // constructor
    var cls = function (_time) {

        var time;

        if(_time > 0) {time = _time;}

        this.isOver = function() {
            return time <= 0;
        };

        this.decrease = function() {
            time--;
        };


        //DEBUG
        this.getTime = function() {
            return time;
        }

    };

    return cls;
})();