/**
 * Created by Laurin on 28.11.2015.
 */
var FilterManager = (function () {
    // constructor
    var cls = function () {
        var activeFilter = [];

        var fireFilter;
        var plasmaFilter;
        var heartFilter;
      //  var drunkFilter;
        var blurXFilter;
        var testFilter;

        fireFilter = KonfettiPolonaise.getPhaser().add.filter('Fire',  KonfettiPolonaise.getPhaser().width,  KonfettiPolonaise.getPhaser().height);
        fireFilter.alpha = 0.0;
        plasmaFilter = KonfettiPolonaise.getPhaser().add.filter('Plasma', KonfettiPolonaise.getPhaser().width, KonfettiPolonaise.getPhaser().height);
        plasmaFilter.alpha = 0.0;
       // drunkFilter = KonfettiPolonaise.getPhaser().add.filter('Drunk', KonfettiPolonaise.getPhaser().width, KonfettiPolonaise.getPhaser().height);
       // drunkFilter.alpha = 0.0;
       // blurXFilter = KonfettiPolonaise.getPhaser().add.filter('BlurX');
        //blurXFilter.alpha = 0.0;

       // heartFilter = KonfettiPolonaise.getPhaser().add.filter('Heart',  KonfettiPolonaise.getPhaser().width,  KonfettiPolonaise.getPhaser().height);
       // heartFilter.alpha = 0.0;

        //testFilter = KonfettiPolonaise.getPhaser().add.filter('CheckerWave', KonfettiPolonaise.getPhaser().width, KonfettiPolonaise.getPhaser().height);
        //testFilter.alpha = 0.2;


        /** PUBLIC
         *
         */
        this.update = function () {
            updateActiveFilter();
        };

        //TODO alle funktionen erweitern -> filter für arrays von sprite möglich
        this.addFireFilter = function (_sprite) {
            Game.bringToTopWholeScreen();   // WICHTIG
            _sprite.filters = [fireFilter];
            activeFilter.push(fireFilter);
        };

        this.addPlasmaFilter = function (_sprite) {
            Game.bringToTopWholeScreen();   // WICHTIG
            _sprite.filters = [plasmaFilter];
            activeFilter.push(plasmaFilter);
        };

        this.addBlurXFilter = function (_sprite) {
            _sprite.filters = [blurXFilter];
            activeFilter.push(blurXFilter);
        };

        //TODO evtl löschen
        this.test = function (_sprite) {
            _sprite.filters = [testFilter];
            activeFilter.push(testFilter);
        };
/*
        this.addDrunkFilter = function (_sprite) {
            Game.bringToTopWholeScreen();   // WICHTIG
            _sprite.filters = [drunkFilter];
            activeFilter.push(drunkFilter);
        };
*/
        this.removeActiveFilters = function (_sprite) {
            for(var i = 0; i < _sprite.length; i++) {
                _sprite.filters[i].destroy();
            }
            _sprite.filters = null;

            activeFilter = [];
        };

        /** PRIVATE
         *
         */
        var updateActiveFilter = function () {
            for (var i = 0; i < activeFilter.length; i++) {
                activeFilter[i].update();
            }
        };
    };

    //inherit(cls, DisplayElement); // <-- important!

    return cls;
})();