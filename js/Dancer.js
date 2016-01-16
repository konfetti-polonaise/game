var Dancer = (function () {
    var headFiles = [
        'dancer-head-blond',
        'dancer-head-brown',
        'dancer-head-red',
        'dancer-head-white',
        'dancer-head-blue',
        'dancer-head-black'
    ];

    var bodyFiles = [
        'dancer-chest-blue',
        'dancer-chest-yellow',
        'dancer-chest-green',
        'dancer-chest-hotpink',
        'dancer-chest-pink',
        'dancer-chest-orange',
        'dancer-chest-red',
        'dancer-chest-lightblue',
        'dancer-chest-lightbrown',
        'dancer-chest-lightgray',
        'dancer-chest-petrol',
        'dancer-chest-black'
    ];

    var legFiles = [
        'dancer-legs-blue',
        'dancer-legs-green',
        'dancer-legs-red',
        'dancer-legs-lightblue',
        'dancer-legs-pink',
        'dancer-legs-black'
    ];

    // constructor
    var cls = function (_x, _y, _fadeIn) {
        var head, body, legs;

        var fadeIn = true;
        if (_fadeIn !== undefined) {
            fadeIn = _fadeIn;
        }

        var direction = new Direction();

        var createBodyPart = function(group, sprite) {
            var part = group.create(group.x, group.y, sprite);
            part.pivot.x = part.width / 2;
            part.pivot.y = part.height / 2;
            part.frame = 0;

            return part;
        };

        var createLegs = function (group) {
            var part = createBodyPart(group, legFiles[Game.random(0, legFiles.length)]);
            part.x -= 4;
            //part.y -= 1;

            part.animations.add('walk', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 6, true);
            part.animations.add('pickup', [13], 0, true);
            part.animations.add('dancing', [0], 0, true);

            return part;
        };

        var createBody = function (group) {
            var part = createBodyPart(group, bodyFiles[Game.random(0, bodyFiles.length)]);

            part.animations.add('walk', [5], 0, true);
            part.animations.add('pickup', [4], 0, true);
            part.animations.add('dancing', [0, 1, 2, 3], 5, true);

            part.animations.play('dancing');

            return part;
        };

        var createHead = function (group) {
            var part = createBodyPart(group, headFiles[Game.random(0, headFiles.length)]);

            part.animations.add('walk', [5], 0, true);
            part.animations.add('pickup', [4], 0, true);
            part.animations.add('dancing', [0, 1, 2, 3], 5, true);

            return part;
        };

        var randomizeDancer = function(_x, _y) {
            var group = KonfettiPolonaise.add.group();
            group.x = _x;
            group.y = _y;
            group.pivot.x = _x;
            group.pivot.y = _y;

            legs = createLegs(group);
            body = createBody(group);
            head = createHead(group);

            return group;
        };

        var group = randomizeDancer(_x, _y);

        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this, _x, _y, group, fadeIn);

        // Rotation
        this.setRotation(direction.getRotation());

        Game.addToHitList(this);

        var isPickedUp = false;

        this.action = function() {
            // Wartend auf Einsammlug
            if(isPickedUp == false) {
                isPickedUp = true;

                Game.removeFromHitList(this);
                Game.addToPassingList(this);

                this.playAnimation('pickup');

                this.turnTowards(Game.getSnake());

                this.startShaking();

                Game.increaseSpeed();

                Score.increaseScore();

                // Neuen Dancer machen
                Game.placeRandomDisplayElement(new Dancer(0, 0), true);
            }
            // Game Over
            else {
                Game.gameOver(this);
            }
        };

        this.turnTowards = function(infront) {
            // Distanz zwischen beiden Objekten
            var dx = roundXdecimal(infront.getX(), 2) - roundXdecimal(this.getX(), 2); // deltaX
            var dy = roundXdecimal(infront.getY(), 2) - roundXdecimal(this.getY(), 2); // deltaY

            // Neuen Tänzer zum Vorgänger drehen
            var direction = new Direction();
            if(Math.abs(dx) > Math.abs(dy)) {
                if(dx > 0) {
                    direction.setRight();
                } else {
                    direction.setLeft();
                }
            } else {
                if(dy < 0) {
                    direction.setUp();
                } else {
                    direction.setDown();
                }
            }

            this.setDirection(direction);
        };

        this.queue = function() {
            Game.removeFromPassingList(this);
            Game.addToSnake(this);
        };

        this.getDirection = function() {
            return direction;
        };

        this.setDirection = function(_direction) {
            direction = new Direction(_direction.getXDistance(), _direction.getYDistance());
            this.setRotation(direction.getRotation());
        };

        this.addAnimation = function(_name, _frames, _fps, _loop) {};

        this.playAnimation = function(_name) {
            var i = group.length;

            while(i--) {
                group.children[i].animations.play(_name);
            }
        };

        this.setAnimationSpeed = function(_speed) {
            legs.animations.currentAnim.speed = _speed;
        };
    };

    cls.getHeadFiles = function() {
        return headFiles;
    };

    cls.getBodyFiles = function() {
        return bodyFiles;
    };

    cls.getLegFiles = function() {
        return legFiles;
    };

    cls.getSpritesheets = function() {
        return cls.getHeadFiles().concat(cls.getBodyFiles(), cls.getLegFiles());
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();