var Snake = (function () {
    // constructor
    var cls = function () {
        // private
        var speed = 1;
        var buffList = [];
        var head = new Head(16 + 32 + 32 + 32 +32, 16 + 32);

        var neu1 = new Dancer(16+32,16+32+32);
        var neuD1 = new Direction();
        neuD1.setUp();
        neu1.setDirection(neuD1);

        var neu2 = new Dancer(16+32,16+32+32+32);
        var neuD2 = new Direction();
        neuD2.setUp();
        neu2.setDirection(neuD2);

        var followers = [new Dancer(16 + 32 + 32+32, 16 + 32), new Dancer(16 + 32+32, 16 + 32), new Dancer(16+32, 16 + 32),
            neu1, neu2
        ];

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

        this.changeDirection = function(_direction) {
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

            head.changeDirection(_direction);
        };

        this.move = function() {
            var follower;

            head.setX(head.getX() + head.getDirection().getXDistance());
            head.setY(head.getY() + head.getDirection().getYDistance());

            for(var i = 0; i < followers.length; i++) {
                follower = followers[i];

                follower.setX(follower.getX() + follower.getDirection().getXDistance());
                follower.setY(follower.getY() + follower.getDirection().getYDistance());
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

        // function deleteFromBuffList()
    };

    return cls;
})();