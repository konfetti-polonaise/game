var Snake = (function () {
    // constructor
    var cls = function () {
        // private
        var speed = 7;      // Initialgeschwindigkeit
        var buff = null;    // Powerupeffekt
        var head = new Head(16 + 32, 16 + 32);  // Startposition. TODO: Zufällig platzieren ???

        // Richtung in die sich die Richtung des Heads ändern wird, sobald Schlange im Grid ist.
        var nextDirection;

        var followers = [
            //new Dancer(16 + 32 + 32 + 32, 16 + 32),
            //new Dancer(16 + 32 + 32, 16 + 32),
            //new Dancer(16 + 32, 16 + 32)
        ];


        this.getNextDirection = function() {
            return nextDirection;
        };

        this.setNextDirection = function(_nextDirection) {
            if( _nextDirection instanceof Direction) {      // Wenn gültige Richtung.
                nextDirection = _nextDirection;
            }
        };

        this.getSpeed = function () {
            return speed;
        };

        this.setSpeed = function (_speed) {
            speed = _speed;
        };

        /** Wird aufgerufen um die Geschwindigkeit und somit die Schwierigkeit zu erhöhen.
         */
        this.increaseSpeed = function() {
            speed++;
        };


        this.getHitboxHeight = function() {
            return head.getHitboxHeight();
        };

        this.getHitboxWidth = function() {
            return head.getHitboxWidth();
        };


        this.addBuff = function(_buff) {
            buff = _buff;
        };

        this.removeBuff = function() {
            buff = null;
        };

        this.getBuff = function() {
            return buff;
        };

        /** Wird ein mal pro UPDATE aufgerufen. zählt den Timer des PowerUps runter, und entfernt dieses, wenn er bei 0 ist.
         */
        this.decreaseBuffTimer = function () {

            if(null != buff) {  // wenn es einen buff gibt
                if(buff.isOver()) {
                    buff.undo();
                }
                else {
                    buff.decreaseTimer();
                }
            }
        };


        this.getX = function() {
            return head.getX();
        };

        this.getY = function() {
            return head.getY();
        };

        /** PUBLIC. Dreht ein element und fügt es der Schlange hinzu
         */
        this.addFollower = function(dancer) {
            // Vorgänger ermitteln
            var infront = head;
            if(followers.length > 0) {
                infront = followers[followers.length - 1];
            }

            // Distanz zwischen beiden Objekten
            var dx = Game.round2decimal(infront.getX()) - Game.round2decimal(dancer.getX()); // deltaX
            var dy = Game.round2decimal(infront.getY()) - Game.round2decimal(dancer.getY()); // deltaY

            document.getElementById('infront').innerHTML =
                'x: ' + infront.getX() + '\n' +
                'y: ' + infront.getY() + '\n'
            ;

            document.getElementById('dancer').innerHTML = '\n' +
                'x: ' + dancer.getX() + '\n' +
                'y: ' + dancer.getY() + '\n'
                + '\n' +
                'dx: ' + dx + '\n' +
                'dy: ' + dy + '\n'
            ;

            // Neuen Tänzer zum Vorgänger drehen
            var direction = new Direction();
            if(Math.abs(dx) > Math.abs(dy)) {
                dancer.setX(infront.getX() - dx);

                if(dx > 0) {
                    direction.setRight();
                }
                else {
                    direction.setLeft();
                }
            } else {
                dancer.setY(infront.getY() - dy);

                if(dy < 0) {
                    direction.setUp();
                }
                else {
                    direction.setDown();
                }
            }
            dancer.setDirection(direction);

            followers.push(dancer);
        };


        /** PUBLIC. Prüft, ob sich ein Element innerhalb der Schlange (Head + Follower) befindet.
         */
        this.isInside = function(obj) {
            var i = followers.length;

            if(Game.hitTest(this, obj)) {
                return true;
            }

            while(i--) {
                if(Game.hitTest(followers[i], obj)) {
                    return true;
                }
            }

            return false;
        };

        // Was macht die Funktion und wofür ist sie da ?
        this.getBodyCollision = function() {
            for(var i = 1; i < followers.length; i++) {
                if(Game.hitTest(head, followers[i])) {
                    return followers[i];
                }
            }

            return null;
        };

        /** PRIVATE. Bewegt die gesammte Schlange (Head + Follower) um einen Schritt.
         */
        var move = function() {
            var follower;

            head.setX(head.getX() + head.getDirection().getXDistance());
            head.setY(head.getY() + head.getDirection().getYDistance());

            for(var i = 0; i < followers.length; i++) {
                follower = followers[i];

                follower.setX(follower.getX() + follower.getDirection().getXDistance());
                follower.setY(follower.getY() + follower.getDirection().getYDistance());
            }
        };


        /** PRIVATE. Ändert die Richtung des Heads, also die Richtung in die sich die Schlange bewegt.
         * @param _direction Richtung in die geändert werden soll
         */
        var changeHeadDirection = function(_direction) {

            if(_direction instanceof Direction) {
                head.changeDirection(_direction);
            }
        };


        /** PRIVATE. Ändert die Richtung aller Follower abhängig von deren Vordermann.
         */
        var changeFollowersDirection = function() {
            var tempDirection, follower;
            var nextDirection = head.getDirection();

            for(var i = 0; i < followers.length; i++) {
                follower = followers[i];

                tempDirection = follower.getDirection();
                if(!nextDirection.equals(tempDirection)) {
                    follower.setDirection(nextDirection);
                    nextDirection = tempDirection;
                }
            }
        };


        /** PUBLIC. Führt eine gesammte Schlangen Bewegung durch. Wenn sich die Schlange im Grid befindet,
         * wird zusätztlich:
         * - Die Richtung der Follower aktualisiert
         * - Wenn eine Eingabe erfolgt ist wird die Richtung des Heads geändert.
         */
        this.step = function() {

            move(); // Schlange bewegt sich um eine Schrittweite

            if(isSnakeInGrid()) {
                
                changeFollowersDirection(); // Follower drehen sich
                changeHeadDirection(nextDirection); // Head dreht sich gegebenenfalls
            }
        };


        /** PRIVATE. Ob sich die Schlange im Grid befindet.
         */
        var isSnakeInGrid = function() {
            return Game.isInGrid(head);
        };

    };



    return cls;
})();