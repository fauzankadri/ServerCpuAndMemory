var api = (function () {
    var module = {};

    // standard ajax call function
    function send(method, url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (xhr.status !== 200) callback("[" + xhr.status + "] " + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }
    // send requests to server

    module.getCpuUsage = function (callback) {
        send("GET", '/api/cpu/usage/', null, callback);
    };

    module.getMemoryUsage = function (callback) {
        send("GET", '/api/memory/usage/', null, callback);
    };

    module.getUptime = function(callback) {
        send("GET", '/api/app/uptime/', null, callback);
    }

    return module;
})();