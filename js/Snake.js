var Snake = (function () {
    // constructor
    var cls = function () {
        // private
        var speed = 7;  // Initialgeschwindigkeit
        var buffList = [];
        var head = new Head(16 + 32 + 32 + 32 +32, 16 + 32);

        // Richtung in die sich die Richtung des Heads ändern wird, sobald Schlange im Grid ist.
        var nextDirection;

        var followers = [
            //new Dancer(16 + 32 + 32 + 32, 16 + 32),
            //new Dancer(16 + 32 + 32, 16 + 32),
            //new Dancer(16 + 32, 16 + 32)
        ];


        // public (this instance only)


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

        this.addToBuffList = function(buff) {
            buffList.push(buff);
        };

        this.getHitboxHeight = function() {
            return head.getHitboxHeight();
        };

        this.getHitboxWidth = function() {
            return head.getHitboxWidth();
        };

        this.xxx = function () {
            var i = buffList.length;
            while(i--) {
                // bufftimer runterzählen
                // & ggf entfernen
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
            /*
            TODO: Neuer Dancer muss sich beim einhängen immer zum Vordermann wenden
             und nicht die Direction des Vordermanss übernehmen
            */
            var direction = head.getDirection();
            if(followers.length > 0) {
                direction = followers[followers.length - 1].getDirection();
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





        // function deleteFromBuffList()  ???
    };

    return cls;
})();