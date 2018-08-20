"use strict";
(function (exports) {
    var os = require('os');

    var samples = [];
    var prevCpus = os.cpus();
    var result = { curr: null, one: null, five: null, fifteen: null };

    setInterval(setSamples, 100)
    setInterval(getUsage, 1000)

    function getUsage() {
        result = { curr: 0, one: 0, five: 0, fifteen: 0 }
        var percent = 0;
        var i = samples.length; // start from last ele b/c thats the most recent
        var j = 0;
        while (i--) {
            j++
            if (samples[i].total > 0) {
                // percent of idle time, minus 100 to get percent of actual work
                percent += (100 - (100 * samples[i].idle / samples[i].total))
            }
            // compute current, updated every 1 second
            if (j == 10) {
                result.curr = Math.round(100 * percent / j) / 100;
            }
            // compute 1 minute
            else if (j == 600) {
                result.one = Math.round(100 * percent / j) / 100;
            }
            // compute 5 minutes
            else if (j == 3000) {
                result.five = Math.round(100 * percent / j) / 100;
            }
            // compute 15 minutes
            else if (j == 9000) {
                result.fifteen = Math.round(100 * percent / j) / 100;
            }
        }
    }

    // this function will keep getting samples and saving them in a variable
    // this will help compute the cpu usage real time
    function setSamples() {
        var currCpus = os.cpus()
        for (var i = 0, len = currCpus.length; i < len; i++) {
            var prevCpu = prevCpus[i];
            var currCpu = currCpus[i];
            var info = { total: 0 };
            for (var type in prevCpu.times)
                info.total += currCpu.times[type] - prevCpu.times[type]; // get the total of all cpu work
            info.idle = currCpu.times.idle - prevCpu.times.idle; // get the idle time
        }
        prevCpus = currCpus;
        samples.push(info)
        if (samples.length > 9000) samples.shift()
    }

    exports.getCpuUsage = function () {
        return result;
    }

    exports.getMemoryUsage = function () {
        // get memory usage in byte, then convert to megabyte. round to 2nd decimal
        let freemem = Math.round(100 * os.freemem() / 1024 / 1024 / 1024) / 100;
        let totalmem = Math.round(os.totalmem() / 1024 / 1024 / 1024);
        let usage = Math.round((totalmem - freemem) * 100) / 100;
        return (usage).toString() + " GB of " + (totalmem).toString() + " GB";
    }

    exports.getUptime = function () {
        return (
            new Date(process.uptime() * 1000).toISOString().substr(11, 8)
        );
    }

}(typeof exports === "undefined" ? (this.usage_cpu_mem = {}) : exports));