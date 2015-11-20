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
        var spriteName = 'dude-gradeaus';

        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(…)).
        this.constructor.super.call(this, _x, _y, spriteName);

        // public (this instance only)
        this.action = function () {
            return null; // TODO: ausprogrammieren..
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