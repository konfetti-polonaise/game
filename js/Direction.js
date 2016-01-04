var Direction = (function () {

    var distance = 0.1;   // Verbuggt ?!

    /** Konstruktor: Initialisiert wenn _x und _y angegeben sind die Richtung manuell.
     * So kann auch eine Direction erzeugt werden,
     * die eine distance unabhängig vom Standardwert hat. Dies ist allerdings sehr fehleranfällig!
     * @param _x xDistanz
     * @param _y yDistanz
     */
    var cls = function (_x, _y) {
        var xDistance = _x || 0;
        var yDistance = _y || 0;


        this.isRight = function() {
            return xDistance == distance;
        };
        this.isLeft = function() {
            return xDistance == -distance;
        };
        this.isDown = function() {
            return yDistance == distance;
        };
        this.isUp = function() {
            return yDistance == -distance;
        };
        this.setRight = function() {
            xDistance = distance;
            yDistance = 0;
        };
        this.setLeft = function() {
            xDistance = -distance;
            yDistance = 0;
        };
        this.setDown = function() {
            xDistance = 0;
            yDistance = distance;
        };
        this.setUp = function() {
            xDistance = 0;
            yDistance = -distance;
        };
        this.getXDistance = function() {
            return xDistance;
        };
        this.getYDistance = function() {
            return yDistance;
        };
        this.getRotation = function() {
            if(this.isRight()) {
                return 0;
            }
            else if(this.isLeft()) {
                return 180;
            }
            else if(this.isDown()) {
                return 90;
            }
            else if(this.isUp()) {
                return 270;
            }
        };


        this.equals = function(_direction) {

            //console.log(xDistance == _direction.getXDistance()
            //    && yDistance == _direction.getYDistance());

            return xDistance == _direction.getXDistance()
                && yDistance == _direction.getYDistance();
        };

        this.isOpposite = function(_direction) {

            var opposite = false;

            if(_direction.isRight() && this.isLeft()) {
                opposite = true;
            }
            else if(_direction.isLeft() && this.isRight()) {
                opposite = true;
            }
            else if(_direction.isDown() && this.isUp()) {
                opposite = true;
            }
            else if(_direction.isUp() && this.isDown()) {
                opposite = true;
            }

            return opposite;
        };

        // Wenn Richtung nicht schon gesetzt wurde
        if(xDistance == 0 && yDistance == 0) {
            this.setRight();
        }

    };

    return cls;
})();