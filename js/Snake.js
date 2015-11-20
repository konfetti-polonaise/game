var Snake = (function () {
    // constructor
    var cls = function () {
        // private
        var speed = 1;
        var buffList = [];
        var head = new Head(16, 16);
        var direction = {x:speed, y:0};
        var followers = [];

        // public (this instance only)
        this.getSpeed = function () {
            return speed;
        };

        this.setSpeed = function (_speed) {
            speed = _speed;
        };
        this.addToBuffList = function(buff) {
            buffList.push(buff);
        };
        this.xxx = function () {
            var i = buffList.length;
            while(i--) {
                // bufftimer runterzählen
                // & ggf entfernen
            }
        };

        this.changeDirection = function(_direction) {
            switch (_direction) {
                case 'R':
                    if(direction.x != -1) {
                        direction.x = 1;
                        direction.y = 0;
                    }
                    break;
                case 'L':
                    if(direction.x != 1) {
                        direction.x = -1;
                        direction.y = 0;
                    }
                    break;
                case 'D':
                    if(direction.y != -1) {
                        direction.y = 1;
                        direction.x = 0;
                    }
                    break;
                case 'U':
                    if(direction.y != 1) {
                        direction.y = -1;
                        direction.x = 0;
                    }
                    break;
            }
        };
        this.move = function() {
            head.setX(head.getX() + direction.x);
            head.setY(head.getY() + direction.y);
        };
        this.getX = function() {
            return head.getX();
        };
        this.getY = function() {
            return head.getY();
        };

        // function deleteFromBuffList()
    };

    return cls;
})();