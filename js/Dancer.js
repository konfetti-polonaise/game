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
        var spriteName = 'wall';
        var direction = new Direction();

        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this, _x, _y, spriteName, true);

        Game.addToHitList(this);

        // public (this instance only)
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
                console.log('collision Schlange');
            }
        };

        this.getDirection = function() {
            return direction;
        };

        this.setDirection = function(_direction) {
            direction = _direction;
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