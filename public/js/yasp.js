require('../../node_modules/font-awesome/css/font-awesome.css');
require('../../node_modules/dota2-minimap-hero-sprites/assets/stylesheets/dota2minimapheroes.css');
window.$ = require('jquery');
//jquery plugins
require('../../node_modules/datatables-bootstrap3-plugin/media/css/datatables-bootstrap3.css');
require('../../node_modules/datatables/media/js/jquery.dataTables.js');
require('../../node_modules/datatables-bootstrap3-plugin/media/js/datatables-bootstrap3.js');
require('../../node_modules/qTip2/dist/jquery.qtip.css');
require('qTip2');
require('../../node_modules/selectize/dist/css/selectize.bootstrap3.css');
require('selectize');
//require('../../node_modules/select2/dist/css/select2.css');
//require('../../node_modules/select2-bootstrap-theme/dist/select2-bootstrap.css');
//require('../../node_modules/select2/dist/js/select2.full.js');
//require('../../node_modules/bootstrap/dist/css/bootstrap.css');
//bundling darkly doesn't work right now due to webpack not properly resolving font paths
//require('../../node_modules/bootswatch/darkly/bootstrap.css');
require('bootstrap');
require('wordcloud');
require('../../node_modules/c3/c3.css');
window.c3 = require('c3');
require('../../node_modules/cal-heatmap/cal-heatmap.css');
window.CalHeatMap = require('cal-heatmap');
window.h337 = require('../../node_modules/heatmap.js/build/heatmap.js');
window.moment = require('moment');
window.numeral = require('numeral');
//yasp utility functions
window.pad = function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};
//adjust each x/y coordinate by the provided scale factor
//if max is provided, use that, otherwise, use local max of data
//shift all values by the provided shift
window.adjustHeatmapData = function adjustHeatmapData(posData, scalef, max, shift) {
    posData.forEach(function(d) {
        for (var key in d) {
            d[key] = scaleAndExtrema(d[key], scalef, max, shift);
        }
    });

    function scaleAndExtrema(points, scalef, max, shift) {
        points.forEach(function(p) {
            p.x *= scalef;
            p.y *= scalef;
            p.value += (shift || 0);
        });
        var vals = points.map(function(p) {
            return p.value;
        });
        var localMax = Math.max.apply(null, vals);
        return {
            min: 0,
            max: max || localMax,
            data: points,
        };
    }
}
window.format = function format(input) {
    input = Number(input);
    if (input === 0 || isNaN(input)) {
        return "-";
    }
    return (Math.abs(input) < 1000 ? ~~(input) : numeral(input).format('0.0a'));
};
window.formatSeconds = function formatSeconds(input) {
    var absTime = Math.abs(input);
    var minutes = ~~(absTime / 60);
    var seconds = pad(~~(absTime % 60), 2);
    var time = ((input < 0) ? "-" : "");
    time += minutes + ":" + seconds;
    return time;
};
window.tooltips = require('./tooltips.js');
window.formatHtml = require("./formatHtml.js");
window.createHistogram = require('./histograms.js');
window.createCalHeatmap = require('./calheatmap.js');
window.buildMap = require('./buildMap.js');
window.playerMatches = require('./playerMatches.js');
window.drawHeroes = require('./drawHeroes.js');
window.drawTeammates = require('./drawTeammates.js');
window.ratingsChart = require('./ratingsChart.js');
window.generateCharts = require('./charts.js');
window.timeline = require('./timeline.js');
require('./ga.js');
