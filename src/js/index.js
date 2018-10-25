import Vue from 'vue';
import Graph from './components/Graph.vue';
import Slider from './components/Slider.vue';

new Vue({
    el: '#app',
    components: {
        Graph,
        Slider
    }
})

// const stTemps = {"celcius": {
//                          "2018-01-01 00:00:00":1.040, "2018-01-02 00:00:00":0.705, "2018-01-03 00:00:00":0.044, "2018-01-04 00:00:00":0.290,"2018-01-05 00:00:00":0.204, "2018-01-06 00:00:00":0.942, "2018-01-07 00:00:00":0.560, "2018-01-08 00:00:00":0.969, "2018-01-09 00:00:00":1.042, "2018-01-10 00:00:00":6.502, "2018-01-11 00:00:00":3.002, "2018-01-12 00:00:00":3.230,
//                          "2018-02-01 00:00:00":5.220, "2018-02-02 00:00:00":5.704, "2018-02-03 00:00:00":3.504, "2018-02-04 00:00:00":3.205,"2018-02-05 00:00:00":5.280, "2018-02-06 00:00:00":5.640, "2018-02-07 00:00:00":2.072, "2018-02-08 00:00:00":9.230, "2018-02-09 00:00:00":1.402, "2018-02-10 00:00:00":6.020, "2018-02-11 00:00:00":3.403, "2018-02-12 00:00:00":3.210,
//                          "2018-03-01 00:00:00":7.309, "2018-03-02 00:00:00":11.70, "2018-03-03 00:00:00":13.024, "2018-03-04 00:00:00":13.20,"2018-03-05 00:00:00":15.20, "2018-03-06 00:00:00":15.20, "2018-03-07 00:00:00":15.02, "2018-03-08 00:00:00":9.2e0, "2018-03-09 00:00:00":10.02, "2018-03-10 00:00:00":11.02, "2018-03-11 00:00:00":10.02, "2018-03-12 00:00:00":13.20,
//                          "2018-04-01 00:00:00":11.09, "2018-04-02 00:00:00":12.70, "2018-04-03 00:00:00":13.04, "2018-04-04 00:00:00":10.20,"2018-04-05 00:00:00":15.20, "2018-04-06 00:00:00":12.20, "2018-04-07 00:00:00":15.45, "2018-04-08 00:00:00":16.20, "2018-04-09 00:00:00":17.02, "2018-04-10 00:00:00":16.02, "2018-04-11 00:00:00":14.05, "2018-04-12 00:00:00":13.20,
//                          "2018-05-01 00:00:00":10.99, "2018-05-02 00:00:00":14.80, "2018-05-03 00:00:00":14.04, "2018-05-04 00:00:00":13.20,"2018-05-05 00:00:00":15.20, "2018-05-06 00:00:00":19.20, "2018-05-07 00:00:00":20.02, "2018-05-08 00:00:00":19.20, "2018-05-09 00:00:00":19.02, "2018-05-10 00:00:00":16.02, "2018-05-11 00:00:00":14.22, "2018-05-12 00:00:00":17.20,
//                          "2018-06-01 00:00:00":20.09, "2018-06-02 00:00:00":22.70, "2018-06-03 00:00:00":19.90, "2018-06-04 00:00:00":21.20,"2018-06-05 00:00:00":25.20, "2018-06-06 00:00:00":24.20, "2018-06-07 00:00:00":25.02, "2018-06-08 00:00:00":26.20, "2018-06-09 00:00:00":23.02, "2018-06-10 00:00:00":22.02, "2018-06-11 00:00:00":23.08, "2018-06-12 00:00:00":24.20,
//                          "2018-07-01 00:00:00":24.09, "2018-07-02 00:00:00":25.70, "2018-07-03 00:00:00":29.91, "2018-07-04 00:00:00":28.20,"2018-07-05 00:00:00":28.20, "2018-07-06 00:00:00":27.20, "2018-07-07 00:00:00":25.02, "2018-07-08 00:00:00":26.20, "2018-07-09 00:00:00":29.02, "2018-07-10 00:00:00":28.92, "2018-07-11 00:00:00":27.02, "2018-07-12 00:00:00":29.20,
//                          "2018-08-01 00:00:00":25.09, "2018-08-02 00:00:00":28.70, "2018-08-03 00:00:00":24.96, "2018-08-04 00:00:00":26.20,"2018-08-05 00:00:00":25.90, "2018-08-06 00:00:00":24.87, "2018-08-07 00:00:00":25.92, "2018-08-08 00:00:00":26.45, "2018-08-09 00:00:00":30.02, "2018-08-10 00:00:00":28.02, "2018-08-11 00:00:00":28.08, "2018-08-12 00:00:00":26.20,
//                          "2018-09-01 00:00:00":23.09, "2018-09-02 00:00:00":22.70, "2018-09-03 00:00:00":19.97, "2018-09-04 00:00:00":21.20,"2018-09-05 00:00:00":20.20, "2018-09-06 00:00:00":21.20, "2018-09-07 00:00:00":22.02, "2018-09-08 00:00:00":21.20, "2018-09-09 00:00:00":20.22, "2018-09-10 00:00:00":22.32, "2018-09-11 00:00:00":21.62, "2018-09-12 00:00:00":18.20,
//                          "2018-10-01 00:00:00":17.19, "2018-10-02 00:00:00":18.70, "2018-10-03 00:00:00":18.97, "2018-10-04 00:00:00":17.70,"2018-10-05 00:00:00":17.20, "2018-10-06 00:00:00":16.50, "2018-10-07 00:00:00":15.22, "2018-10-08 00:00:00":16.18, "2018-10-09 00:00:00":15.87, "2018-10-10 00:00:00":15.23, "2018-10-11 00:00:00":14.97, "2018-10-12 00:00:00":13.20,
//                          "2018-11-01 00:00:00":8.193, "2018-11-02 00:00:00":8.720, "2018-11-03 00:00:00":6.697, "2018-11-04 00:00:00":7.720,"2018-11-05 00:00:00":6.720, "2018-11-06 00:00:00":6.506, "2018-11-07 00:00:00":5.252, "2018-11-08 00:00:00":6.158, "2018-11-09 00:00:00":7.897, "2018-11-10 00:00:00":7.353, "2018-11-11 00:00:00":7.947, "2018-11-12 00:00:00":8.240,
//                          "2018-12-01 00:00:00":5.154, "2018-12-02 00:00:00":5.250, "2018-12-03 00:00:00":6.127, "2018-12-04 00:00:00":5.720,"2018-12-05 00:00:00":6.320, "2018-12-06 00:00:00":5.506, "2018-12-07 00:00:00":5.252, "2018-12-08 00:00:00":5.158, "2018-12-09 00:00:00":4.897, "2018-12-10 00:00:00":4.353, "2018-12-11 00:00:00":3.947, "2018-12-12 00:00:00":3.240
//                          },
//                   "fahrenheit": {
//                          "2018-01-02":4.00, "2018-01-03":0.00, "2018-01-04":3.00, "2018-01-05":6.00, "2018-01-07":4.64, "2018-01-07":3.25, "2018-01-08":2.42, "2018-01-09":1.15, "2018-01-10":1.57, "2018-01-11":1.27, "2018-01-12":2.0,
//                          "2018-01-13":2.78, "2018-01-14":3.2, "2018-01-15":4.01, "2018-01-16":3.35, "2018-01-17":2.56, "2018-01-18":4.98, "2018-01-19":5.8,"2018-01-20":5.9, "2018-01-21":5.78, "2018-01-22":5.95, "2018-01-23":5.4,
//                          "2018-01-24":4.83, "2018-01-25":4.15, "2018-01-26":4.44, "2018-01-27":3.9, "2018-01-28":3.33, "2018-01-29":2.789, "2018-01-30":2.99, "2018-01-31":3.79
//                          }
//                 }


/* The following are commented out not because it's not needed but still need to be added to "new" version
var beginDate = new Date("January 1, 2018");
var endDate = new Date("Dec 30, 2018");
var dataType; // stores current data type option
var arr = []; // new empty array
var parsedData = null;

window.onload = function() {
    // value1 = 0;
    // value2 = 11;

    setupSlider(0, 11, pretendGraph);
    h1 = 0;
    h2 = 11;
};

function pretendGraph() {
    console.log('This is when the graph would be updated based on new slider values');
}
*/