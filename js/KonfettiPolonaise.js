var KonfettiPolonaise = (function () {
    // private static
    var phaser = new Phaser.Game(
        800,
        512,
        Phaser.AUTO,
        'game'
    );

    phaser.state.add('Game', Game);
    phaser.state.start('Game');

    // constructor
    var cls = function () {

    };

    cls.getPhaser = function() {
        return phaser;
    };

    return cls;
})();

function inherit(cls, superCls) {
    // We use an intermediary empty constructor to create an
    // inheritance chain, because using the super class' constructor
    // might have side effects.
    var construct = function () {};
    construct.prototype = superCls.prototype;
    cls.prototype = new construct;
    cls.prototype.constructor = cls;
    cls.super = superCls;
}