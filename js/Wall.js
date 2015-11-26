// unsichtbare Wand zur Hitdetection.
// aussehen der W�nde wird durch das hintergrundbild.png festegelegt
var Wall = (function () {
    var spriteName = 'wall';    // wird noch ein durchsichtiges Bild. sichtbar zum testen.

    // constructor
    var cls = function (_x, _y) {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(�)).
        this.constructor.super.call(this, _x, _y, spriteName);
        Game.addToHitList(this);

        this.action = function() {
            Game.gameOver(this);
        };
    };

    cls.getSpritesheets = function() {
        return [
            spriteName
        ];
    };

    inherit(cls, DisplayElement); // <-- important!

    return cls;
})();