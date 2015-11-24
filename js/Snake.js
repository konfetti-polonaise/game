var Snake = (function () {
    // constructor
    var cls = function () {
        // private
        var speed = 1;
        var buffList = [];
        var head = new Head(16 + 32 + 32 + 32 +32, 16 + 32);

        // Richtung in die sich die Richtung des Heads ändern wird, sobald Schlange im Grid ist.
        var nextDirection;

        var neu1 = new Dancer(16+32,16+32+32);
        var neuD1 = new Direction();
        neuD1.setUp();
        neu1.setDirection(neuD1);

        var neu2 = new Dancer(16+32,16+32+32+32);
        var neuD2 = new Direction();
        neuD2.setUp();
        neu2.setDirection(neuD2);

        var followers = [
            new Dancer(16 + 32 + 32 + 32, 16 + 32),
            new Dancer(16 + 32 + 32, 16 + 32),
            new Dancer(16 + 32, 16 + 32),
            neu1,
            neu2
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

        this.addFollower = function(dancer) {
            followers.push(dancer);
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