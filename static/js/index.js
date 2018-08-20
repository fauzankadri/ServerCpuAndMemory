(function () {
    "use strict"; // uses latest javascript

    window.addEventListener('load', function () {

        // api call. calls the function in api.js
        setInterval(displayCpu, 100);
        function displayCpu() {
            api.getCpuUsage(function (err, callback) {
                if (err) console.log(err);
                else {
                    document.getElementById('cur2').innerHTML = `${JSON.stringify(callback.usage.curr)} %` // insert into DOM
                    document.getElementById('one2').innerHTML = `${JSON.stringify(callback.usage.one)} %`
                    document.getElementById('five2').innerHTML = `${JSON.stringify(callback.usage.five)} %`
                    document.getElementById('fifteen2').innerHTML = `${JSON.stringify(callback.usage.fifteen)} %`
                }
            });
        }


        // api call. calls function in api.js
        setInterval(displayMemory, 100);
        function displayMemory() {
        api.getMemoryUsage(function (err, callback) {
            if (err) console.log(err);
            else {
                document.getElementById('mem2').innerHTML = `${callback.usage}` // insert into DOM
            }
        })
    }
    setInterval(displayUptime, 100);
    function displayUptime() {
        api.getUptime(function (err, callback) {
            if(err) console.log(err);
            else {
                document.getElementById("uptime2").innerHTML = `${callback.uptime}`;
            }
        })
    }

    });

}())
