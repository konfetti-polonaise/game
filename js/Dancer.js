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
        'dancer-chest-black'
    ];

    var legFiles = [
        'dancer-legs-blue',
        'dancer-legs-green',
        'dancer-legs-red',
        'dancer-legs-black'
    ];

    // constructor
    var cls = function (_x, _y) {
        var direction = new Direction();

        var createBodyPart = function(group, sprite) {
            var part = group.create(group.x, group.y, sprite);
            part.pivot.x = part.width / 2;
            part.pivot.y = part.height / 2;
            part.frame = 0;

            return part;
        };

        var randomizeDancer = function(_x, _y) {
            var group = KonfettiPolonaise.getPhaser().add.group();
            group.x = _x;
            group.y = _y;
            group.pivot.x = _x;
            group.pivot.y = _y;

            createBodyPart(group, legFiles[Game.random(0, legFiles.length)]);
            createBodyPart(group, bodyFiles[Game.random(0, bodyFiles.length)]);
            createBodyPart(group, headFiles[Game.random(0, headFiles.length)]);

            return group;
        };

        var group = randomizeDancer(_x, _y);

        group.addAnimation = function(_name, _frames, _fps, _loop) {};
        group.playAnimation = function(_name) {};

        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this, _x, _y, group, true);

        // Rotation
        this.setRotation(direction.getRotation());

        Game.addToHitList(this);

        var isPickedUp = false;

        this.action = function() {
            // Wartend auf Einsammlug
            if(isPickedUp == false) {
                isPickedUp = true;

                Game.removeFromHitList(this);
                Game.addToPassingList(this); // Warum ?

                Game.increaseSpeed();

                // Neuen Dancer machen
                Game.placeRandomDisplayElement(new Dancer(0,0), true);
            }
            // Game Over
            else {
                Game.gameOver(this);
            }
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