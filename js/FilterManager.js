/**
 * Created by Laurin on 28.11.2015.
 */
var FilterManager = (function () {
   // var spriteName = 'snake-head';


    // constructor
    var cls = function () {
        // Call super constructor on this instance (any arguments
        // to the constructor would go after "this" in call(?)).
        //this.constructor.super.call(this, _x, _y, spriteName);

        var activeFilter = [];

        var fireFilter;
        var plasmaFilter;
        var drunkFilter;

        //TODO methode create nutzen?
        fireFilter =   KonfettiPolonaise.getPhaser().add.filter('Fire',  KonfettiPolonaise.getPhaser().width,  KonfettiPolonaise.getPhaser().height);
        fireFilter.alpha = 0.0;
        plasmaFilter = KonfettiPolonaise.getPhaser().add.filter('Plasma', KonfettiPolonaise.getPhaser.width, KonfettiPolonaise.getPhaser().height);
        plasmaFilter.alpha = 0.0;
        //drunkFilter = KonfettiPolonaise.getPhaser().add.filter('Drunk', KonfettiPolonaise.getPhaser().width, KonfettiPolonaise.getPhaser().height);
        //drunkFilter.alpha = 0.0;



        /** PUBLIC
         *
         */
        this.update = function () {
            updateActiveFilter();
        };

        //TODO alle funktionen erweitern -> filter für arrays von sprite möglich
        this.addFireFilter = function (_sprite) {
            _sprite.filters = [fireFilter];
            activeFilter.push(fireFilter);
        };

        this.addPlasmaFilter = function (_sprite) {
            _sprite.filters = [plasmaFilter];
            activeFilter.push(plasmaFilter);
        };
/*
        this.addDrunkFilter = function (_sprite) {
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