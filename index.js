const stTemps = {"pastYear": {
                         "2018-01-02":0.70, "2018-01-03":0.04, "2018-01-04":0.20,"2018-01-05":0.204, "2018-01-06":0.92, "2018-01-07":0.5, "2018-01-08":0.990, "2018-01-09":1.02, "2018-01-10":6.02,"2018-01-11":3.022, "2018-01-12":3.20,
                         "2018-02-01":1.09, "2018-02-02":8.70, "2018-02-03":3.04, "2018-02-04":3.20,"2018-02-05":5.20, "2018-02-06":5.40, "2018-02-07":2.02, "2018-02-08":9.20, "2018-02-09":1.02, "2018-02-10":6.02,"2018-02-11":0.022, "2018-02-12":3.20,
                         "2018-03-01":7.09, "2018-03-02":11.70, "2018-03-03":3.04, "2018-03-04":13.20,"2018-03-05":15.20, "2018-03-06":19.20, "2018-03-07":15.02, "2018-03-08":9.20, "2018-03-09":10.02, "2018-03-10":11.02,"2018-03-11":10.022, "2018-03-12":13.20,
                         "2018-04-01":11.09, "2018-04-02":12.70, "2018-04-03":13.04, "2018-04-04":10.20,"2018-04-05":15.20, "2018-04-06":12.20, "2018-04-07":15.45, "2018-04-08":16.20, "2018-04-09":17.02, "2018-04-10":16.02,"2018-04-11":14.022, "2018-04-12":13.20,
                         "2018-05-01":10.99, "2018-05-02":14.80, "2018-05-03":14.04, "2018-05-04":13.20,"2018-05-05":15.20, "2018-05-06":19.20, "2018-05-07":20.02, "2018-05-08":19.20, "2018-05-09":19.02, "2018-05-10":16.02,"2018-05-11":10.022, "2018-05-12":17.20,
                         "2018-06-01":20.09, "2018-06-02":22.70, "2018-06-03":19.9, "2018-06-04":21.20,"2018-06-05":25.20, "2018-06-06":24.20, "2018-06-07":25.02, "2018-06-08":26.20, "2018-06-09":23.02, "2018-06-10":22.02,"2018-06-11":23.022, "2018-06-12":24.20
                         },
                  "pastMonth": {
                         "2018-01-02":4.00, "2018-01-03":0.00, "2018-01-04":3.00, "2018-01-05":6.00, "2018-01-06":4.64, "2018-01-07":3.25, "2018-01-08":2.42, "2018-01-09":1.15, "2018-01-10":1.57, "2018-01-11":1.27, "2018-01-12":2.0,
                         "2018-01-13":2.78, "2018-01-14":3.2, "2018-01-15":4.01, "2018-01-16":3.35, "2018-01-17":2.56, "2018-01-18":4.98, "2018-01-19":5.8,"2018-01-20":5.9, "2018-01-21":5.78, "2018-01-22":5.95, "2018-01-23":5.4,
                         "2018-01-24":4.83, "2018-01-25":4.15, "2018-01-26":4.44, "2018-01-27":3.9, "2018-01-28":3.33, "2018-01-29":2.789, "2018-01-30":2.99, "2018-01-31":3.79
                         }
                }

var dataTypePrevious; // stores previous data type
var dataType; // stores current data type option
var arr = []; // new empty array
var parsedData = null;

injectTypes();
processAndInsert();

// enables select button when type option changes
// d3.selectAll("#types").on('change', function(d) {
//     var datatype = getDataType();
//     if (datatype == dataTypePrevious) {
//         d3.select('button').attr('disabled', true);
//     } else {
//         d3.select('button').attr('disabled', null);
//     }
// });

// reaction to user click of select button
d3.selectAll('#types')
    .on('change', function(d) {
      processAndInsert();
    });

// on change of type, decide whether to gray out button or not
// function processType() {
//     var datatype = getDataType();
//     if (datatype == dataTypePrevious) {
//         d3.select('button').attr('disabled', true);
//     } else {
//         d3.select('button').attr('disabled', null);
//     }
// }

// runs main methods needed to graph data
function processAndInsert () {
    // d3.selectAll('g').remove();

    resetDataType();

    parsedData = parseData(dataType); // parses json data into form suitible to create line chart (defined below) // stores parsed arr as variable
    // console.log(arr);
    // console.log(parsedData);
    var datesArr = [];
    for (var i in arr) {
        datesArr.push(arr[i].date);
    }

    drawChart(parsedData); // call to drawChart method (defined below)
    // console.log(datesArr);
    // d3.selectAll('button').attr('disabled', true);
}

// resets the type of data to be displayed based on user's option selection
function resetDataType() {
    var datatype = getDataType();
    if (datatype == "Temperature (\xB0C)") {
        dataType = stTemps.pastYear;
        dataTypePrevious = datatype;
        console.log(datatype);
        console.log(dataType);
        console.log(dataTypePrevious);
    } else if (datatype == "Temperature (\xB0F)") {
        dataType = stTemps.pastMonth;
        dataTypePrevious = datatype;
    } else if (datatype == "Temperature (K)") {
        dataType = null;
        dataTypePrevious = datatype;
        console.log("data in kelvins would display here");
    } else if (datatype == "Humidity (%)") {
        dataType = null;
        dataTypePrevious = datatype;
        console.log("humidity data would display here");
    } else {
        console.log("Sorry! No graph for you");
    }
}

// returns selected option for type of data of first graph
function getDataType() {
    return document.getElementById("types").value;
}

// puts data types into drop down menu so user can choose from later, default is Temp celcius
function injectTypes() {
    document.getElementById("types").defaultValue = "Temperature(\xB0F)";
    // default value: "Show me: (Choose one)"
    var typesArr = ["Temperature (\xB0C)", "Temperature (\xB0F)", "Temperature (K)", "Humidity (%)" ];
    for (var i = 0; i < typesArr.length; i++) {
        var type = document.createElement("option");
        type.innerHTML = typesArr[i];
        document.getElementById("types").appendChild(type);
    }
}

/**
 * Parse data into key-value pairs
 * @param {object} data Object containing historical data of temperatures
 */

function parseData(dataType) {
    arr = []; // new empty array
    for (var i in dataType) { // for every temperatures in parsed data
        arr.push({
            date: new Date(i), //date ('key')
            value: dataType[i]
        })
    }
    return arr; // return array with key:value pairs
}

/**
 * Creates a chart using D3
 * @param {object} data Object containing historical data of temperatures
 */
function drawChart(data) {
    var svgWidth = 600, svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // d3.selectAll('svg').remove();

    d3.selectAll('svg > *').remove();

    var svg = d3.select('svg')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime() // scales time
        .domain([new Date("January 1, 2018"), new Date("June 30, 2018")])
        .range([0, width]);

    var y = d3.scaleLinear() // scales y-axis
        .range([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.date)}) // sets x value of temperatures point based on 'date' and scaled value of 'date'
        .y(function(d) { return y(d.value)}) // sets y value of temperatures point point based on 'value' and scaled value of 'value'

        x.domain(d3.extent(data, function(d) { return d.date })); // informs d3 of scope of data, extent returns min & max of dates
        y.domain(d3.extent(data, function(d) { return d.value })); // returns min & max y-value
        // mins & maxs then used to make scales properly

    g.append("g") // append a child 'g' into parent 'g'
        .attr("transform", "translate(0," + height + ")") // starts at bottom left of parent 'g'
        .call(d3.axisBottom(x)); // creates x-axis in newly created 'g' element

    svg
        .append("g")
        .append("text")
        .text("January") // can be retrieved from data instead of being harcoded
        .style("font-size", 10)
        .style("font-family", "sans-serif")
        .attr("transform", "translate(35," + (svgHeight - 15) + ")");

    // y-axis label
    g.append("g")
        .call(d3.axisLeft(y)) // creates y-axis
        .append("text") // creates y-axis label
        .attr("fill", "#000") // fill of text tag
        .attr("transform", "rotate(-90)") // rotates label 90 degrees CC-wise
        .attr("y", 6) // y position of label
        .attr("dy", "0.71em")
        .attr("text-anchor", "end") // aligns text at end of text tag
        .text("Temperature (" + "\xB0" + "C)"); // text inside text tag

    // creates line connecting data points
    g.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("x", 10)
        .attr("d", line); // based on variable defined above, appends line for every data element
}
