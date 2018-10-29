<template>
    <div class="slider-container"></div>
</template>

<script>
    import * as d3 from 'd3';
    import {startDrag, drag, endDrag} from '../slider.js';
    export default {
        // props: ['id'],
        data() {
            return {
                value1: 0,
                value2: 11
            };
        },
        methods: {
            endDrag() {
                let v = endDrag();
                console.log('my endDrag');
                console.log(v);
            }

        },
        mounted() {
            let sliderValues = [0, 11];
            // window.sliderValues[this.id] = sliderValues;
            window.sliderValues = sliderValues;
            var  width = 570;
            var svg = // d3.select(`#${this.id}`).append('svg')
            d3.select('div.slider-container').append('svg')
                .attr('width', width + 30)
                .attr('height', 50);
            let x = d3.scaleLinear().domain([0, 11]).range([0, width]).clamp(true);

            window.x = x;
            // window.x[this.id] = x;

            let xMin = x(0); // sets left boundary of slider
            window.xMin = xMin;
            let xMax = x(11); // sets right boundary of slider
            window.xMax = xMax;

            var slider = svg.append('g')
                .attr('class', 'slider')
                .attr('transform', 'translate(5, 20)');

            slider.append('line')
                .attr('class', 'track')
                .attr('x1', 10 + x.range()[0])
                .attr('x2', 10 + x.range()[1]);

            let selRange = slider.append('line')
                .attr('class', 'sel-range')
                .attr('x1', 10 + x(sliderValues[0]))
                .attr('x2', 10 + x(sliderValues[1]));

            // window.selRange[this.id] = selRange;
            window.selRange = selRange;

            let ticksArr = ["Jan '18", "Feb '18", "Mar '18", "Apr '18", "May '18", "Jun '18", "Jul '18", "Aug '18", "Sep '18", "Oct '18", "Nov '18", "Dec '18"];

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
                    // .attr('id', d => `${this.id}-handle-${d}`)
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
        }
    }
</script>

<style>

</style>
