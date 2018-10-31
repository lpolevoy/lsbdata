import * as d3 from 'd3';

function startDrag() {
    // allows dragging to start by setting active class of slider to true
    d3.select(this).raise().classed("active", true);
}

function drag(d) {
    var x1 = d3.event.x; // gets x value of moving handle

    // makes sure handle doesn't exceed slider boundaries
    if(x1 > window.xMax) {
        x1 = window.xMax;
    } else if (x1 < window.xMin) {
        x1 = window.xMin;
    }

    // var id = d3.select(this).attr('id');
    // var index = id.lastIndexOf('-handle-');
    // var key = id.substring(0, index);
    // console.log(key);

    d3.select(this).attr("x", x1); //
    var x2 = window.x(window.sliderValues[d==0 ? 1:0]);

    window.selRange
        .attr("x1", 10 + x1) // places handles inspect
        .attr("x2", 10 + x2)
}

function endDrag(d){
    var elem = d3.select(this);
    // var id = elem.attr('id');
    // var index = id.lastIndexOf('-handle-');
    // var key = id.substring(0, index);

    var v = Math.round(window.x.invert(d3.event.x));
    window.sliderValues[d] = v;

    var v1 = Math.min(window.sliderValues[0], window.sliderValues[1]),
        v2 = Math.max(window.sliderValues[0], window.sliderValues[1]);

    elem.classed("active", false)
        .attr("x", window.x(v));

    window.selRange
      .attr("x1", 10 + window.x(v1))
      .attr("x2", 10 + window.x(v2));

    window.bus.$emit('slider-update', v1, v2); // tell graphsto update
}

export {startDrag, drag, endDrag}
