var h1;
var h2;
var x;
var sliderValues;
var selRange;
var ticksArr = [];

function setupSlider(value1, value2, updateGraph) {
    sliderValues = [value1, value2];
    var  width = 570;
    var svg = d3.select('div.slider-container').append('svg')
                .attr('width', width + 30)
                .attr('height', 50);
    x = d3.scaleLinear().domain([0, 11]).range([0, width]).clamp(true);

    xMin = x(0); // sets left boundary of slider
    xMax = x(11); // sets right boundary of slider

    var slider = svg.append('g')
        .attr('class', 'slider')
        .attr('transform', 'translate(5, 20)');

    slider.append('line')
        .attr('class', 'track')
        .attr('x1', 10 + x.range()[0])
        .attr('x2', 10 + x.range()[1]);

    selRange = slider.append('line')
        .attr('class', 'sel-range')
        .attr('x1', 10 + x(sliderValues[0]))
        .attr('x2', 10 + x(sliderValues[1]));

    ticksArr = ["Jan '18", "Feb '18", "Mar '18", "Apr '18", "May '18", "Jun '18", "Jul '18", "Aug '18", "Sep '18", "Oct '18", "Nov '18", "Dec '18"];

    slider.insert('g', '.track-overlay') // appends ticks group
            .attr('class', 'ticks')
            .attr('transform', 'translate(10, 24)')
        .selectAll('text')
        .data(x.ticks(12))
        .enter().append('text')
            .attr('x', x) // sets x position of each text
            .attr('text-anchor', 'middle')
            //.style('font-weight', 'bold')
            .text(function(d, i) { return ticksArr[i];}); // sets text of each text

    var handle = slider.selectAll('rect')
        .data([0, 1])
        .enter().append('rect', '.track-overlay')
            .attr('class', 'handle')
            .attr('y', -8) // handles at -8 y position
            .attr('x', function(d) { return x(sliderValues[d]); }) // puts handles at value1 and value 2 x position
            .attr('rx', 3) // rounds corners of handles
            .attr('height', 16)
            .attr('width', 20)
            .call(
                d3.drag()
                    .on('start', startDrag)
                    .on('drag', drag)
                    .on('end', endDrag)
            );
    // console.log("Inside setupSlider");
}

function updateGraph(value1, value2) {
    console.log("Updating graph...");
}

function startDrag() {
    d3.select(this).raise().classed("active", true); // allows dragging to start by setting active class of slider to true
    // console.log("Started dragging!");
}

function drag(d) {
    var x1 = d3.event.x; // gets x value of moving handle
    // console.log(x1);

    // makes sure handle doesn't exceed slider boundaries
    if(x1 > xMax){
        x1 = xMax;
    } else if (x1 < xMin){
        x1 = xMin;
    }
    d3.select(this).attr("x", x1); //
    var x2 = x(sliderValues[d==0 ? 1:0]);
    selRange
      .attr("x1", 10 + x1) // places handles inspect
      .attr("x2", 10 + x2)
    // console.log("Dragging!");
}

function endDrag(d){
    var v = Math.round(x.invert(d3.event.x));
    // console.log(v);
    var elem = d3.select(this);
    sliderValues[d] = v;
    var v1 = Math.min(sliderValues[0], sliderValues[1]),
        v2 = Math.max(sliderValues[0], sliderValues[1]);

        h1 = v1;
        h2 = v2;

    console.log(v1 + " " + h1);
    console.log(v2 + " " + h2);

    elem.classed("active", false)
        .attr("x", x(v));

    selRange
      .attr("x1", 10 + x(v1))
      .attr("x2", 10 + x(v2));
    // console.log("Ended dragging!");
    // updateGraph(v1, v2);
    // updatedGraph(v1, v2);
}

function updatedGraph(v1, v2) {
    console.log("Value 1 is: " + v1 + " So min date is: " + ticksArr[v1]);
    console.log("Value 2 is: " + v2 + " So max date is: " + ticksArr[v2]);
    // var newDate = new Date(2018, v1)
    console.log(new Date(2018, v1));
    console.log(new Date(2018, v2));
    // filterDate();
}
