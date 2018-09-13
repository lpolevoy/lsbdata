// // javascript
//
// const stTemps = {"pastYear": {"2018-01-01":"00", "2018-02-01":"12", "2018-03-01":"13", "2018-04-01":"13","2018-05-01":"15", "2018-06-01":"19", "2018-07-01":"25", "2018-08-01":"29", "2018-09-01":"19", "2018-09-01":"16","2018-11-01":"10", "2018-12-01":"03"},
//                  "pastMonth": {"2018-01-01":"01", "2018-01-02":"04", "2018-01-03":"00", "2018-01-05":"06", "2018-01-09":"01", "2018-01-11":"01", "2018-01-15":"02"}
//                 }
//
//
//
// var parsedData = parseData(stTemps);
//
// console.log(parsedData);
// drawChart(parsedData);
//
// /**
// * Parse data into key-value pairs
// * @param {object} data Object containing historical data of BPI
// */
// function parseData(data) {
//   var arr = []; // new empty array
//   console.log(arr);
//   for (var i in data.pastMonth) { // for every temp in parsed data
//       console.log(i);
//       arr.push({
//           date: i, // moment(i, "YYYY-MM-DD"), //date ('key')
//           value: +data.pastMonth[i] //convert string to number (the + does)
//       });
//       console.log(arr);
//   }
//   return arr; // return array with key:value pairs
// }
//
// /**
// * Creates a chart using D3
// * @param {object} data Object containing historical data of BPI
// */
// function drawChart(data) {
// var svgWidth = 600, svgHeight = 400;
// var margin = { top: 20, right: 20, bottom: 30, left: 50 };
// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;
//
// var svg = d3.select('svg')
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);
//
// var g = svg.append("g")
//   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// var x = d3.scaleTime() // scales time
//   .rangeRound([0, width]);
//
// var x = d3.scale().tichFormat(function(d) { return d.date})
//
// var y = d3.scaleLinear() // scales y-axis
//   .rangeRound([height, 0]);
//
// var line = d3.line()
//   .x(function(d) { return x(d.date)}) // sets x value of bpi point based on 'date' and scaled value of 'date'
//   .y(function(d) { return y(d.value)}) // sets y value of bpi point point based on 'value' and scaled value of 'value'
//   x.domain(d3.extent(data, function(d) { return d.date /* .date(); */ })); // informs d3 of scope of data // extent returns min & max of dates
//   y.domain(d3.extent(data, function(d) { return d.value })); // returns min & max y-value
//   // mins & maxs then used to make scales properly
//
// g.append("g") // append a child 'g' into parent 'g'
//   .attr("transform", "translate(0," + height + ")") // starts at bottom left of parent 'g'
//   .call(d3.axisBottom(x)); // creates x-axis in newly created 'g' element
//   // .select(".domain") // why this?
//   // .remove();
//
// g.append("g")
//   .call(d3.axisLeft(y)) // creates y-axis
//   .append("text") // creates y-axis label
//   .attr("fill", "#000") // fill of text tag
//   .attr("transform", "rotate(-90)") // rotates label 90 degrees CC-wise
//   .attr("y", 6) // y position of label
//   .attr("dy", "0.71em")
//   .attr("text-anchor", "end") // aligns text at end of text tag
//   .text("Temperature (degrees)"); // text inside text tag
//
// // creates line connecting data points
// g.append("path")
//   .datum(data)
//   .attr("fill", "none")
//   .attr("stroke", "steelblue")
//   .attr("stroke-linejoin", "round")
//   .attr("stroke-linecap", "round")
//   .attr("stroke-width", 1.5)
//   .attr("d", line); // based on variable defined above, appends line
// }

//API to fetch historical data of Bitcoin Price Index
// const api = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=2017-12-31&end=2018-04-01';
//
// /**
//  * Loading data from API when DOM Content has been loaded'.
//  */
// document.addEventListener("DOMContentLoaded", function(event) {
// fetch(api)
//     .then(function(response) { return response.json(); }) // puts data into json file
//     .then(function(data) {
//         var parsedData = parseData(data); // parses json data into form suitible to create line chart (defined below) // stores parsed arr as variable
//         console.log(parsedData);
//         drawChart(parsedData); // call to drawChart method (defined below)
//     })
//     .catch(function(err) { console.log(err); }) // if there's no data or something??
// });

const stTemps = {"bpi": {
                         "2018-01-01":0.09, "2018-01-02":0.70, "2018-01-03":0.04, "2018-01-04":0.20,"2018-01-05":0.204, "2018-01-06":0.92, "2018-01-07":0.5, "2018-01-08":0.990, "2018-01-09":1.02, "2018-01-10":6.02,"2018-01-11":3.022, "2018-01-12":3.20,
                         "2018-02-01":1.09, "2018-02-02":8.70, "2018-02-03":3.04, "2018-02-04":3.20,"2018-02-05":5.20, "2018-02-06":5.40, "2018-02-07":2.02, "2018-02-08":9.20, "2018-02-09":1.02, "2018-02-10":6.02,"2018-02-11":0.022, "2018-02-12":3.20,
                         "2018-03-01":7.09, "2018-03-02":11.70, "2018-03-03":3.04, "2018-03-04":13.20,"2018-03-05":15.20, "2018-03-06":19.20, "2018-03-07":15.02, "2018-03-08":9.20, "2018-03-09":10.02, "2018-03-10":11.02,"2018-03-11":10.022, "2018-03-12":13.20,
                         "2018-04-01":11.09, "2018-04-02":12.70, "2018-04-03":13.04, "2018-04-04":10.20,"2018-04-05":15.20, "2018-04-06":12.20, "2018-04-07":15.45, "2018-04-08":16.20, "2018-04-09":17.02, "2018-04-10":16.02,"2018-04-11":14.022, "2018-04-12":13.20,
                         "2018-05-01":10.99, "2018-05-02":14.80, "2018-05-03":14.04, "2018-05-04":13.20,"2018-05-05":15.20, "2018-05-06":19.20, "2018-05-07":20.02, "2018-05-08":19.20, "2018-05-09":19.02, "2018-05-10":16.02,"2018-05-11":10.022, "2018-05-12":17.20,
                         "2018-06-01":20.09, "2018-06-02":22.70, "2018-06-03":19.9, "2018-06-04":21.20,"2018-06-05":25.20, "2018-06-06":24.20, "2018-06-07":25.02, "2018-06-08":26.20, "2018-06-09":23.02, "2018-06-10":22.02,"2018-06-11":23.022, "2018-06-12":24.20,
                         }
                 // "pastMonth": {"2018-01-01":"01", "2018-01-02":"04", "2018-01-03":"00", "2018-01-05":"06", "2018-01-09":"01", "2018-01-11":"01", "2018-01-15":"02"}
                }

// const stTemps = {"bpi":{"2017-12-31":13860.1363,"2018-01-01":13412.44,"2018-01-02":14740.7563,"2018-01-03":15134.6513,"2018-01-04":15155.2263,"2018-01-05":16937.1738,"2018-01-06":17135.8363,"2018-01-07":16178.495,"2018-01-08":14970.3575,"2018-01-09":14439.4738,"2018-01-10":14890.7225,
// "2018-01-11":13287.26,"2018-01-12":13812.715,"2018-01-13":14188.785,"2018-01-14":13619.0288,"2018-01-15":13585.9013,"2018-01-16":11348.02,"2018-01-17":11141.2488,"2018-01-18":11250.6475,"2018-01-19":11514.925,"2018-01-20":12759.6413,"2018-01-21":11522.8588,"2018-01-22":10772.15,
// "2018-01-23":10839.8263,"2018-01-24":11399.52,"2018-01-25":11137.2375,"2018-01-26":11090.0638,"2018-01-27":11407.1538,"2018-01-28":11694.4675,"2018-01-29":11158.3938,"2018-01-30":10034.9975,"2018-01-31":10166.5063,"2018-02-01":9052.5763,"2018-02-02":8827.63,"2018-02-03":9224.3913,
// "2018-02-04":8186.6488,"2018-02-05":6914.26,"2018-02-06":7700.3863,"2018-02-07":7581.8038,"2018-02-08":8237.2363,"2018-02-09":8689.8388,"2018-02-10":8556.6125,"2018-02-11":8070.7963,"2018-02-12":8891.2125,"2018-02-13":8516.2438,"2018-02-14":9477.84,"2018-02-15":10016.4888,
// "2018-02-16":10178.7125,"2018-02-17":11092.1475,"2018-02-18":10396.63,"2018-02-19":11159.7238,"2018-02-20":11228.2413,"2018-02-21":10456.1725,"2018-02-22":9830.4263,"2018-02-23":10149.4625,"2018-02-24":9682.3825,"2018-02-25":9586.46,"2018-02-26":10313.0825,"2018-02-27":10564.4188,
// "2018-02-28":10309.6413,"2018-03-01":10907.59,"2018-03-02":11019.5213,"2018-03-03":11438.6513,"2018-03-04":11479.7313,"2018-03-05":11432.9825,"2018-03-06":10709.5275,"201s8-03-07":9906.8,"2018-03-08":9299.2838,"2018-03-09":9237.05,"2018-03-10":8787.1638,"2018-03-11":9532.7413,
// "2018-03-12":9118.2713,"2018-03-13":9144.1475,"2018-03-14":8196.8975,"2018-03-15":8256.9938,"2018-03-16":8269.3275,"2018-03-17":7862.1088,"2018-03-18":8196.0225,"2018-03-19":8594.1913,"2018-03-20":8915.9038,"2018-03-21":8895.4,"2018-03-22":8712.8913,"2018-03-23":8918.7438,
// "2018-03-24":8535.8938,"2018-03-25":8449.835,"2018-03-26":8138.3363,"2018-03-27":7790.1575,"2018-03-28":7937.205,"2018-03-29":7086.4875,"2018-03-30":6844.3213,"2018-03-31":6926.0175,"2018-04-01":6816.74}}
var arr = []; // new empty array
var parsedData = parseData(stTemps); // parses json data into form suitible to create line chart (defined below) // stores parsed arr as variable
var datesArr = [];
for (var i in arr) {
    datesArr.push(arr[i].date);
}
console.log(datesArr);
drawChart(parsedData); // call to drawChart method (defined below)

/**
 * Parse data into key-value pairs
 * @param {object} data Object containing historical data of BPI
 */

function parseData(data) {
    // var arr = []; // new empty array
    for (var i in data.bpi) { // for every bpi in parsed data
        arr.push({
            date: new Date(i), //date ('key')
            value: data.bpi[i] //convert string to number (the + does)
        });
    }
    return arr; // return array with key:value pairs
}

/**
 * Creates a chart using D3
 * @param {object} data Object containing historical data of BPI
 */
function drawChart(data) {
var svgWidth = 600, svgHeight = 400;
var margin = { top: 20, right: 20, bottom: 30, left: 50 };
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select('svg')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime() // scales time
    .domain([new Date("December 31, 2017"), new Date("June 12, 2018")])
    .range([0, width]);

// var x = d3.scaleLinear() // scales time
//     .domain(parsedData[0].date.toString(), parsedData[parsedData.length - 1].date.toString())
//     .range([0, width]);

// var x = d3.scaleLinear() // scales time
//     .domain([new Date("January 1, 2018"), new Date("June 12, 2018")])
//     .range([0, width]);
    // .tickFormat(function(d) { return parsedData[d].date.getMonth(); });



// var a = d3.scalePoint().domain(['Apples','Oranges','Pears','Plums']).range([0,width]);

var y = d3.scaleLinear() // scales y-axis
    .range([height, 0]);

var line = d3.line()
    .x(function(d) { return x(d.date)}) // sets x value of bpi point based on 'date' and scaled value of 'date'
    .y(function(d) { return y(d.value)}) // sets y value of bpi point point based on 'value' and scaled value of 'value'

    x.domain(d3.extent(data, function(d) { return d.date })); // informs d3 of scope of data  // extent returns min & max of dates
    y.domain(d3.extent(data, function(d) { return d.value })); // returns min & max y-value
    // mins & maxs then used to make scales properly

// var xAxis = g.axis()
//     .scale(xScale)
//     .tickFormat(function(d) { return dataset[d].date.toString(); })
//     .orient("bottom");

g.append("g") // append a child 'g' into parent 'g'
    .attr("transform", "translate(0," + height + ")") // starts at bottom left of parent 'g'
    .call(d3.axisBottom(x)); // creates x-axis in newly created 'g' element
    // .tickFormat(function(d) { return parsedData[d].date.getMonth(); });

//     .select(".domain") // why this?
//     .remove();

// var xAxis = d3.svg.axis()
//         .scale(xScale)
//         .orient("bottom");
// // xAxis
//     svg.append("g") // Add the X Axis
//         .attr("class", "x axis")
//         .attr("transform", "translate(0," + height + ")")
//         .call(xAxis);
//     //xAxis Label
//     svg.append("text")
//         .attr("transform", "translate(" + (w / 2) + " ," + (h + margin.bottom - 5) +")")
//         .style("text-anchor", "middle")
//         .text(function(d) {
//             return d.date.toString();
//         });

// y-axis label
g.append("g")
    .call(d3.axisLeft(y)) // creates y-axis
    .append("text") // creates y-axis label
    .attr("fill", "#000") // fill of text tag
    .attr("transform", "rotate(-90)") // rotates label 90 degrees CC-wise
    .attr("y", 6) // y position of label
    .attr("dy", "0.71em")
    .attr("text-anchor", "end") // aligns text at end of text tag
    .text("Temperature (K)"); // text inside text tag

// creates line connecting data points
g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line); // based on variable defined above, appends line for every data element
}
