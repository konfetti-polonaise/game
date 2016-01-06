var KonfettiPolonaise = (function () {

    // private static
    var phaser = new Phaser.Game(
        800,
        512,
        Phaser.AUTO,
        'game'
    );

    var allSounds = [];

    var isMuted = false;

    // Gamestates hinzufügen
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

    cls.displayMenu = function() {
        startState('Menu');
    };


    /** Meldet in Phaser einen neuen Key an und gibt diesen zurueck.
     */
    cls.registerKey = function(phaserKeyName) {
        return phaser.input.keyboard.addKey(Phaser.Keyboard[phaserKeyName]);
    };

    /** Ueber diese Funktion muessen alle Sounds erstellt werden, damit sie durch den muteButton lautlos werden koennen.
     */
    cls.createSound = function(src) {

        var newSound = new Audio(src);
        addToList(allSounds, newSound);
        return newSound;
    };

    /** Macht alle Sounds des Spiels lautlos.
     */
    cls.mute = function() {
        if (isMuted == false) {
            isMuted = true;

            var i = allSounds.length;
            while(i--) {
                allSounds[i].muted = true;
            }
        }
        else{
            isMuted = false;

            var i = allSounds.length;
            while(i--) {
                allSounds[i].muted = false;
            }
        }
    };


    cls.displayMenu();

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

/** Rundet eine Fliesskommazahl mathematisch auf X Dezimalstellen nach dem Komma ab.
 */
function roundXdecimal(floatnumber, decimals) {
    var temp = Math.pow(10, decimals);
    return (Math.round(floatnumber * temp) / temp);
}

// Wichtig wegen gegenseitigen Ladeabheangigkeiten mit Game.
Game.createSounds();




// TODO: city.png aufpimpen ( Strassenlampen, Sand, Wellblechdach)      Hendrik
// TODO: DOKU                                                           Hendrik, Morice, Anja
// TODO: Sollte der Z-Index der Filter nicht immer ganz oben sein?      ???
// TODO: beer fitler programmieren                                      Laurin
// TODO: rosa Filter programmieren                                      Laurin
// TODO: Musikschlampe Feuer unterm Arsch machen                        Laurin
// TODO: Mute-Button in HTML erstellen                                  Hendrik
// TODO: Spawn-Problem fixen                                            David, Laurin, Morice
// TODO: Powerups movedown                                              Marius

