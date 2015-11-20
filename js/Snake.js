var Snake = (function () {
    // constructor
    var cls = function () {
        // private
        var speed;
        var buffList = [];
        var head = new Head(16, 16);
        var followers = [];

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
        this.getX = function() {
            return head.getX();
        };
        this.getY = function() {
            return head.getY();
        };

        // function deleteFromBuffList()
    };

    return cls;
})();