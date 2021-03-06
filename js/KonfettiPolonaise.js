var KonfettiPolonaise = (function () {

    // private static
    var allSounds = [];
    var isMuted = false;

    // constructor
    var cls = function() {
        return new Phaser.Game(
            800,
            512,
            Phaser.AUTO,
            'game'
        );
    }();

    // Gamestates hinzufügen
    cls.state.add('Menu', Menu);
    cls.state.add('Game', Game);
    cls.state.add('GameOver', GameOver);

    var startState = function(state) {
        cls.state.start(state);
    };

    cls.startGame = function() {
        startState('Game');
    };

    cls.gameOver = function() {
        startState('GameOver');
    };

    cls.displayMenu = function() {
        Highscore.refreshTop5();

        document.getElementById('sound').onclick = function() {
            KonfettiPolonaise.toggleMute();
            return false;
        };

        startState('Menu');
    };


    /** Meldet in Phaser einen neuen Key an und gibt diesen zurueck.
     */
    cls.registerKey = function(phaserKeyName) {
        return cls.input.keyboard.addKey(Phaser.Keyboard[phaserKeyName]);
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
    cls.toggleMute = function() {
        var i = allSounds.length;

        if (isMuted == false) {
            isMuted = true;

            while(i--) {
                allSounds[i].muted = true;
            }
            document.getElementById('game').className = 'mute';
        }
        else{
            isMuted = false;

            while(i--) {
                allSounds[i].muted = false;
            }
            document.getElementById('game').className = '';
        }
    };

    cls.showOverlay = function() {
        document.getElementById('overlay').className = 'block';
    };

    cls.hideOverlay = function() {
        document.getElementById('overlay').className = 'none';
    };

    cls.showCredits = function() {
        document.getElementById("credits").className = "block";

        document.getElementById("credits").getElementsByTagName('a')[0].onclick = function() {
            KonfettiPolonaise.hideCredits();

            return false;
        };

        KonfettiPolonaise.showOverlay();

        document.getElementById("overlay").onclick = function() {
            KonfettiPolonaise.hideCredits();

            return false;
        };
    };

    cls.hideCredits = function() {
        document.getElementById("credits").className = "none";
        KonfettiPolonaise.hideOverlay();
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
// TODO: beer fitler programmieren                                      Laurin
// TODO: rosa Filter programmieren                                      Laurin
// TODO: Musikschlampe Feuer unterm Arsch machen                        Laurin
// TODO: Mute-Button in HTML erstellen                                  Hendrik
