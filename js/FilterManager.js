/**
 * Created by Laurin on 28.11.2015.
 */
var FilterManager = (function () {
    // constructor
    var cls = function () {
        var activeFilter = [];

        var fireFilter;
        var jeTaimeFilter;
        var drunkFilterX;

        fireFilter = KonfettiPolonaise.add.filter('Fire',  KonfettiPolonaise.width,  KonfettiPolonaise.height);
        fireFilter.alpha = 0.0;
        jeTaimeFilter = KonfettiPolonaise.add.filter('JeTaimFilter', KonfettiPolonaise.width, KonfettiPolonaise.height);
        jeTaimeFilter.alpha = 0.0;

        drunkFilterX = KonfettiPolonaise.add.filter('DrunkFilterX');



        /** PUBLIC
         *
         */
        this.update = function () {
            updateActiveFilter();
        };

        this.addFireFilter = function (_sprite) {
            _sprite.filters = [fireFilter];
            activeFilter.push(fireFilter);
        };


        this.addDrunkFilter = function (_delList) {
            for (var i  = 0; i < _delList.length; i++) {
                _delList[i].getSprite().filters = [drunkFilterX];
            }
            activeFilter.push(drunkFilterX);

        };

        this.addJeTaimeFilter = function (_sprite) {
            _sprite.filters = [jeTaimeFilter];
            activeFilter.push(jeTaimeFilter);
        };

        this.removeActiveFilters = function (_sprite) {
            if (activeFilterContains(drunkFilterX)) {
                for (var i = 0; i < Game.getDelList().length; i++) {
                    Game.getDelList()[i].getSprite().filters = null;
                }
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
            if (activeFilterContains(drunkFilterX) && Game.getDelList()[Game.getDelList().length -1].getSprite().filters == null) {
                Game.getDelList()[Game.getDelList().length -1].getSprite().filters = [drunkFilterX];
            }
        };

        var activeFilterContains = function (_filter) {
            var lastFilterUsedDelList = false;
            for (var i = 0; i < activeFilter.length; i++) {
                if (activeFilter[i] == _filter) {
                    lastFilterUsedDelList = true;
                }
            }
            return lastFilterUsedDelList;
        };
    };
    return cls;
})();