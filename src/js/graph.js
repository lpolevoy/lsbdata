injectTypes(); // inserts data type options
processAndInsert(); // puts in graph for default data type

// reaction to user click of select button
d3.selectAll('#types')
    .on('change', function(d) {
      processAndInsert();
    });

// function graphLastMonth() {
//
// }

function graphThisMonth () {
    var currentDate = new Date();
    var newData = [];
    console.log(newData);
    for (var i in parsedData) {
        if (currentDate.getMonth() == parsedData[i].date.getMonth()) {
            newData.push(parsedData[i]);
            console.log("We have a match!");
        } else {
            console.log("Sorry! No matches");
        }
    }
    console.log(newData);
    arr = newData;
    // processAndInsert();
}

function filterDate(d) {
    for (var i in arr) {
        console.log(arr[i]);
        console.log(arr[i].date.getMonth());
        console.log(d3.event.x);
    }
}

// runs main methods needed to graph data
function processAndInsert () {
    resetDataType();

    parsedData = parseData(dataType); // parses json data into form suitible to create line chart (defined below) // stores parsed arr as variable

    // graphThisMonth();
    // console.log(arr);
    // console.log(parsedData);
    // var datesArr = [];
    // for (var i in arr) {
    //     datesArr.push(arr[i].date);
    // }

    drawChart(arr); // call to drawChart method (defined below)
    // console.log(datesArr);
    // d3.selectAll('button').attr('disabled', true);
}

// resets the type of data to be displayed based on user's option selection
function resetDataType() {
    var datatype = getDataType();
    dataTypePrevious = datatype;
    if (datatype == "Temperature (\xB0C)") {
        dataType = stTemps.celcius;
    } else if (datatype == "Temperature (\xB0F)") {
        dataType = stTemps.fahrenheit;
    } else if (datatype == "Temperature (K)") {
        dataType = null;
        console.log("data in kelvins would display here");
    } else if (datatype == "Humidity (%)") {
        dataType = null;
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
        // if (xMin == null || Max == null) {
        //     console.log("Not null!");
        // }

        // filter through stTemps and only push into arr needed data points (within slider date range)
        // console.log(new Date(i).getMonth());
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

    // d3.selectAll('svg .line-chart').remove();

    d3.selectAll('svg.line-chart > *').remove();

    var svg = d3.select('svg.line-chart')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleTime() // scales time
        .domain([beginDate, endDate])
        .range([0, width]);

    var y = d3.scaleLinear() // scales y-axis
        .range([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.date)}) // sets x value of temperatures point based on 'date' and scaled value of 'date'
        .y(function(d) { return y(d.value)}) // sets y value of temperatures point point based on 'value' and scaled value of 'value'

        x.domain(d3.extent(data, function(d) { return d.date; })); // informs d3 of scope of data, extent returns min & max of dates
        y.domain(d3.extent(data, function(d) { return d.value })); // returns min & max y-value
        // mins & maxs then used to make scales properly

    g.append("g") // append a child 'g' into parent 'g'
        .attr("transform", "translate(0," + height + ")") // starts at bottom left of parent 'g'
        .call(d3.axisBottom(x).tickSizeOuter(0)/*.tickFormat(function(d, i) {
                            var months = ["January", "February", "March", "April", "May", "June", "July"];
                            return months[i];
                        })*/); // creates x-axis in newly created 'g' element

    // d3.selectAll('.tick').(function(d) {
    //     if (d == 6) {
    //         this.remove();
    //     }
    // });

    svg
        .append("g")
        .append("text")
        // .text("January") // can be retrieved from data instead of being harcoded
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
        .text(dataTypePrevious); // text inside text tag

    //svg.selectAll('tick')

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


// enables select button when type option changes
// d3.selectAll("#types").on('change', function(d) {
//     var datatype = getDataType();
//     if (datatype == dataTypePrevious) {
//         d3.select('button').attr('disabled', true);
//     } else {
//         d3.select('button').attr('disabled', null);
//     }
// });

// on change of type, decide whether to gray out button or not
// function processType() {
//     var datatype = getDataType();
//     if (datatype == dataTypePrevious) {
//         d3.select('button').attr('disabled', true);
//     } else {
//         d3.select('button').attr('disabled', null);
//     }
// }

//     var ticks = ["Jan '18", "Feb '18", "Mar '18", "Apr '18", "May '18", "Jun '18", "Jul '18", "Aug '18", "Sep '18", "Oct '18", "Nov '18", "Dec '18"];

// d3.select('#first-slider').on('change', function(d) {
//     var timeRange = d3.select('#first-slider').property('value');
//
//     if (timeRange == 1) {
//         console.log("1");
//     } else if (timeRange == 2) {
//         console.log("2");
//     } else if (timeRange == 3) {
//         console.log("3");
//     } else if (timeRange == 4) {
//         resetDataType();
//         parsedData = parseData(dataType);
//         graphThisMonth();
//         drawChart(arr);
//     } else if (timeRange == 5) {
//         console.log("5");
//     } else if (timeRange == 6) {
//         console.log("6");
//     } else {
//         console.log("WHAT?!");
//     }
// });
