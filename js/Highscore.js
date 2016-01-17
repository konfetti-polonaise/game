var Highscore = (function () {
    var apiUrl = 'http://nowottnik.com/konfetti-polonaise/highscore.php';
    var maxPosition = 20;
    var score;

    var colors = [
        '#D1246E',
        '#EF5B9A',
        '#F88CD4',
        '#d5d5d5',
        '#cccccc',
        '#c4c4c4',
        '#bbbbbb',
        '#b3b3b3',
        '#aaaaaa',
        '#a2a2a2',
        '#999999',
        '#919191',
        '#888888',
        '#808080',
        '#777777',
        '#6f6f6f',
        '#666666',
        '#5e5e5e',
        '#555555',
        '#4d4d4d'
    ];


    // constructor
    var cls = function (_score) {
        score = _score;

        // Form reset
        document.getElementById('name').className = '';
        document.getElementById('submit').className = '';
        document.getElementById('position').className = '';
        document.getElementById('nametag').className = 'none';

        // Top 5 aktualisieren
        cls.refreshTop5();

        // Positionierung
        ajax.get({'points': score, 'time': new Date().getTime()},  function(data) {
            var json = JSON.parse(data);

            if(json.length > 0) {
                var position = json[0].position;

                // Formular einblenden
                if(position != 0 && position <= maxPosition) {
                    document.getElementById('position').innerHTML = position + '.';
                    cls.displayForm();
                }
            }
        });
    };

    var ajax = {};
    ajax.x = function() {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for(var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    };

    ajax.send = function(url, callback, method, data, sync) {
        var x = ajax.x();
        x.open(method, url, sync);
        x.onreadystatechange = function() {
            if (x.readyState == 4) {
                callback(x.responseText)
            }
        };
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        x.send(data);
        return x;
    };

    ajax.get = function(data, callback, sync) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        return ajax.send(apiUrl + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, sync)
    };

    ajax.post = function(data, callback, sync) {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        return ajax.send(apiUrl, callback, 'POST', query.join('&'), sync)
    };

    var getLi = function(_position, _name, _points) {

        var html = '<li style="color: ' + colors[_position - 1] + ';">';

        if(_position <= 9) {
            html += '&nbsp;';
        }

        html +=
            _position + '. ' +
            _name +
            '<span>' + _points + '</span>' +
            '</li>'
        ;

        return html;
    };

    var writeTop20 = function(data) {
        var json = JSON.parse(data);

        if(json.length > 0) {
            var html = '<ul class="ranking">';

            for (var i = 0; i < 10; i++) {
                html += getLi(i + 1, json[i].name, json[i].points);
            }

            html += '</ul><ul class="ranking">';

            for (var i = 10; i < 20; i++) {
                html += getLi(i + 1, json[i].name, json[i].points);
            }

            html += '</ul>';
            document.getElementById('top20').innerHTML = html;
        }
    };

    var writeTop5 = function(data) {
        var json = JSON.parse(data);

        if(json.length > 0) {
            var html = '<ul class="ranking">';

            for (var i = 0; i < json.length; i++) {
                html += getLi(i + 1, json[i].name, json[i].points);
            }

            html += '</ul>';
            document.getElementById('top5').innerHTML = html;
        }
    };

    var writeHighscore = function(data) {
        writeTop5(data);
    };

    var writeRanking = function(data) {
        writeTop20(data);
    };

    var postHighscore = function(_name, _points, _callback) {
        ajax.post({'name': _name, 'points': _points}, function(data) {
            writeHighscore(data);

            if(_callback != null) {
                _callback(data);
            }
        });
    };

    var requestHighscore = function(_limit, _callback) {
        ajax.get({'limit': _limit}, function(data) {
            if(_callback != null) {
                _callback(data);
            }
        });
    };

    cls.refreshTop5 = function() {
        requestHighscore(5, function(data) {writeHighscore(data)});
    };

    cls.displayRanking = function() {
        document.getElementById("ranking").getElementsByTagName('a')[0].onclick = function() {
            Highscore.hideRanking();

            return false;
        };

        KonfettiPolonaise.showOverlay();

        document.getElementById("overlay").onclick = function() {
            Highscore.hideRanking();

            return false;
        };

        requestHighscore(maxPosition, function(data) {
            writeRanking(data);
            document.getElementById("ranking").className = "block";
        });
    };

    cls.hideRanking = function() {
        document.getElementById("ranking").className = "none";
        KonfettiPolonaise.hideOverlay();
    };

    cls.displayForm = function() {
        KonfettiPolonaise.input.enabled = false;
        document.getElementById("highscoreform").className = "block";

        document.getElementById("highscoreform").onsubmit = function() {
            var name = document.getElementById('name').value;
            document.getElementById('nametag').innerHTML = name;

            document.getElementById('name').className = 'active';
            document.getElementById('submit').className = 'active';

            postHighscore(name, score, function() {
                document.getElementById('name').className = 'none';
                document.getElementById('submit').className = 'none';
                document.getElementById('position').className = 'blink';
                document.getElementById('nametag').className = 'blink';

                var elm = document.getElementById('highscoreform').getElementsByTagName('h2')[0];
                elm.parentNode.replaceChild(elm.cloneNode(true), elm);
            });

            this.onsubmit = function() {return false};

            return false;
        };
    };

    return cls;
})();