var Snake = (function () {
    // constructor
    var cls = function () {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this);

        // private
        var speed,
            buffList = [];

        // public (this instance only)
        this.getSpeed = function () {
            return speed;
        };

        this.setSpeed = function (_speed) {
            speed = _speed;
        };
        this.addToBuffList = function(buff) {
            buffList.push(buff);
        };
        this.xxx = function () {
            var i = buffList.length;
            while(i--) {
                // bufftimer runterzählen
                // & ggf entfernen
            }
        };
        this.move = function() {

        };
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();