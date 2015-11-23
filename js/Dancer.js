var Dancer = (function () {
    var headFiles = [
        'dude-kopf-blond',
        'dude-kopf-braun',
        'dude-kopf-rot',
        'dude-kopf-white'
    ];

    var bodyFiles = [
        'dude-oberteil-blau',
        'dude-oberteil-gelb',
        'dude-oberteil-lila',
        'dude-oberteil-rot',
        'dude-oberteil-schwarz'
    ];

    var legFiles = [
        'dude-beine-gradeaus-blau',
        'dude-beine-gradeaus-gruen',
        'dude-beine-gradeaus-rot'
    ];

    // constructor
    var cls = function (_x, _y) {
        var spriteName = 'dude-oberteil-blau';
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
            }
            // An Schlange hängen
            else {
                //TODO
                console.log('collision Schlange mit Schlange');
            }
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