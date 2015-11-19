var KonfettiPolonaise = (function () {

    // constructor
    var cls = function () {
        var snake;

        var phaser = new Phaser.Game(
            800,
            512,
            Phaser.AUTO,
            'game',
            {
                preload: preload,
                create: create,
                render: render,
                update: update
            }
        );

        function preload() {

        }
        function create() {
            snake = new Snake();
        }
        function render() {

        }
        function update() {

        }

        // public (this instance only)
        this.getPhaser = function () {
            return phaser;
        };

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