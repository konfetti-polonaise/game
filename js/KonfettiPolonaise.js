var KonfettiPolonaise = (function () {

    var score; // Punktestand

    // private static
    var phaser = new Phaser.Game(
        800,
        512,
        Phaser.AUTO,
        'game'
    );

    phaser.state.add('Menu', Menu);
    phaser.state.add('Game', Game);
    phaser.state.add('GameOver', GameOver);
    // constructor
    var cls = function () {

    };

    var startState = function(state) {
        phaser.state.start(state);
    };

    cls.getPhaser = function() {
        return phaser;
    };

    cls.startGame = function() {
        startState('Game');
    };

    cls.gameOver = function() {
        startState('GameOver');
    };


    /** Meldet in Phaser einen neuen Key an und gibt diesen zurueck.
     */
    cls.registerKey = function(phaserKeyName) {
        return phaser.input.keyboard.addKey(Phaser.Keyboard[phaserKeyName]);
    };


    cls.displayScore = function(_score) {
        document.getElementById("score").innerHTML = _score;
    };


    cls.setScore = function(_score) {
        score = _score;
        KonfettiPolonaise.displayScore(_score);
    };


    cls.addScore = function(_add) {
        KonfettiPolonaise.setScore(score + _add);
    };


    cls.startGame();

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

function addToList(list, element) {
    list.push(element);
}

function removeFromList(list, element) {
    var i = list.length;
    while(i--) {
        if(list[i] === element) {
            list.splice(i, 1);
        }
    }
}

/** Rundet eine Flieﬂkommazahl mathematisch auf X Dezimalstellen nach dem Komma ab.
 */
function roundXdecimal(floatnumber, decimals) {
    var temp = Math.pow(10, decimals);
    return (Math.round(floatnumber * temp) / temp);
}


// TODO: waiting Dancer tanzanimation animieren.
// TODO: hauptmenue-Grafik designen ( "secret agent man"-Style)
// TODO: city.png aufpimpen ( Strassenlampen, Sand, Wellblechdach)
// TODO: beer fitler programmieren
// TODO: rosa Filter programmieren
// TODO: Hauptmenue-stage Programmieren (Start mit Leertaste)
// TODO: Sounds einfuegen
// TODO: Mexikanerhut vergroessern
