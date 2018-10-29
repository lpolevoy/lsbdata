<template>
    <div>
        <select class="d-block" v-model="dataType" @change="updateChart">
            <option v-for="type in dataTypes" :value="type">{{ type.text }}</option>
        </select>
        <!-- <slider :id="svgid + '-slider'"></slider> -->
        <svg :id="svgid" class="line-chart"></svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'; // can be more specific
    // import Slider from './Slider.vue'

    export default {
        props: ['svgid'],
        data() {
            return {
                // would actually be a prop data
                stTemps: {
                    "celcius": {
                        "2018-01-01 00:00:00":1.040, "2018-01-02 00:00:00":0.705, "2018-01-03 00:00:00":0.044, "2018-01-04 00:00:00":0.290,"2018-01-05 00:00:00":0.204, "2018-01-06 00:00:00":0.942, "2018-01-07 00:00:00":0.560, "2018-01-08 00:00:00":0.969, "2018-01-09 00:00:00":1.042, "2018-01-10 00:00:00":6.502, "2018-01-11 00:00:00":3.002, "2018-01-12 00:00:00":3.230,
                        "2018-02-01 00:00:00":5.220, "2018-02-02 00:00:00":5.704, "2018-02-03 00:00:00":3.504, "2018-02-04 00:00:00":3.205,"2018-02-05 00:00:00":5.280, "2018-02-06 00:00:00":5.640, "2018-02-07 00:00:00":2.072, "2018-02-08 00:00:00":9.230, "2018-02-09 00:00:00":1.402, "2018-02-10 00:00:00":6.020, "2018-02-11 00:00:00":3.403, "2018-02-12 00:00:00":3.210,
                        "2018-03-01 00:00:00":7.309, "2018-03-02 00:00:00":11.70, "2018-03-03 00:00:00":13.024, "2018-03-04 00:00:00":13.20,"2018-03-05 00:00:00":15.20, "2018-03-06 00:00:00":15.20, "2018-03-07 00:00:00":15.02, "2018-03-08 00:00:00":9.2e0, "2018-03-09 00:00:00":10.02, "2018-03-10 00:00:00":11.02, "2018-03-11 00:00:00":10.02, "2018-03-12 00:00:00":13.20,
                        "2018-04-01 00:00:00":11.09, "2018-04-02 00:00:00":12.70, "2018-04-03 00:00:00":13.04, "2018-04-04 00:00:00":10.20,"2018-04-05 00:00:00":15.20, "2018-04-06 00:00:00":12.20, "2018-04-07 00:00:00":15.45, "2018-04-08 00:00:00":16.20, "2018-04-09 00:00:00":17.02, "2018-04-10 00:00:00":16.02, "2018-04-11 00:00:00":14.05, "2018-04-12 00:00:00":13.20,
                        "2018-05-01 00:00:00":10.99, "2018-05-02 00:00:00":14.80, "2018-05-03 00:00:00":14.04, "2018-05-04 00:00:00":13.20,"2018-05-05 00:00:00":15.20, "2018-05-06 00:00:00":19.20, "2018-05-07 00:00:00":20.02, "2018-05-08 00:00:00":19.20, "2018-05-09 00:00:00":19.02, "2018-05-10 00:00:00":16.02, "2018-05-11 00:00:00":14.22, "2018-05-12 00:00:00":17.20,
                        "2018-06-01 00:00:00":20.09, "2018-06-02 00:00:00":22.70, "2018-06-03 00:00:00":19.90, "2018-06-04 00:00:00":21.20,"2018-06-05 00:00:00":25.20, "2018-06-06 00:00:00":24.20, "2018-06-07 00:00:00":25.02, "2018-06-08 00:00:00":26.20, "2018-06-09 00:00:00":23.02, "2018-06-10 00:00:00":22.02, "2018-06-11 00:00:00":23.08, "2018-06-12 00:00:00":24.20,
                        "2018-07-01 00:00:00":24.09, "2018-07-02 00:00:00":25.70, "2018-07-03 00:00:00":29.91, "2018-07-04 00:00:00":28.20,"2018-07-05 00:00:00":28.20, "2018-07-06 00:00:00":27.20, "2018-07-07 00:00:00":25.02, "2018-07-08 00:00:00":26.20, "2018-07-09 00:00:00":29.02, "2018-07-10 00:00:00":28.92, "2018-07-11 00:00:00":27.02, "2018-07-12 00:00:00":29.20,
                        "2018-08-01 00:00:00":25.09, "2018-08-02 00:00:00":28.70, "2018-08-03 00:00:00":24.96, "2018-08-04 00:00:00":26.20,"2018-08-05 00:00:00":25.90, "2018-08-06 00:00:00":24.87, "2018-08-07 00:00:00":25.92, "2018-08-08 00:00:00":26.45, "2018-08-09 00:00:00":30.02, "2018-08-10 00:00:00":28.02, "2018-08-11 00:00:00":28.08, "2018-08-12 00:00:00":26.20,
                        "2018-09-01 00:00:00":23.09, "2018-09-02 00:00:00":22.70, "2018-09-03 00:00:00":19.97, "2018-09-04 00:00:00":21.20,"2018-09-05 00:00:00":20.20, "2018-09-06 00:00:00":21.20, "2018-09-07 00:00:00":22.02, "2018-09-08 00:00:00":21.20, "2018-09-09 00:00:00":20.22, "2018-09-10 00:00:00":22.32, "2018-09-11 00:00:00":21.62, "2018-09-12 00:00:00":18.20,
                        "2018-10-01 00:00:00":17.19, "2018-10-02 00:00:00":18.70, "2018-10-03 00:00:00":18.97, "2018-10-04 00:00:00":17.70,"2018-10-05 00:00:00":17.20, "2018-10-06 00:00:00":16.50, "2018-10-07 00:00:00":15.22, "2018-10-08 00:00:00":16.18, "2018-10-09 00:00:00":15.87, "2018-10-10 00:00:00":15.23, "2018-10-11 00:00:00":14.97, "2018-10-12 00:00:00":13.20,
                        "2018-11-01 00:00:00":8.193, "2018-11-02 00:00:00":8.720, "2018-11-03 00:00:00":6.697, "2018-11-04 00:00:00":7.720,"2018-11-05 00:00:00":6.720, "2018-11-06 00:00:00":6.506, "2018-11-07 00:00:00":5.252, "2018-11-08 00:00:00":6.158, "2018-11-09 00:00:00":7.897, "2018-11-10 00:00:00":7.353, "2018-11-11 00:00:00":7.947, "2018-11-12 00:00:00":8.240,
                        "2018-12-01 00:00:00":5.154, "2018-12-02 00:00:00":5.250, "2018-12-03 00:00:00":6.127, "2018-12-04 00:00:00":5.720,"2018-12-05 00:00:00":6.320, "2018-12-06 00:00:00":5.506, "2018-12-07 00:00:00":5.252, "2018-12-08 00:00:00":5.158, "2018-12-09 00:00:00":4.897, "2018-12-10 00:00:00":4.353, "2018-12-11 00:00:00":3.947, "2018-12-12 00:00:00":3.240
                    },
                    "fahrenheit": {
                        "2018-01-02":4.00, "2018-01-03":0.00, "2018-01-04":3.00, "2018-01-05":6.00, "2018-01-07":4.64, "2018-01-07":3.25, "2018-01-08":2.42, "2018-01-09":1.15, "2018-01-10":1.57, "2018-01-11":1.27, "2018-01-12":2.0,
                        "2018-01-13":2.78, "2018-01-14":3.2, "2018-01-15":4.01, "2018-01-16":3.35, "2018-01-17":2.56, "2018-01-18":4.98, "2018-01-19":5.8,"2018-01-20":5.9, "2018-01-21":5.78, "2018-01-22":5.95, "2018-01-23":5.4,
                        "2018-01-24":4.83, "2018-01-25":4.15, "2018-01-26":4.44, "2018-01-27":3.9, "2018-01-28":3.33, "2018-01-29":2.789, "2018-01-30":2.99, "2018-01-31":3.79
                    }
                },
                beginDate: new Date("January 1, 2018"),
                endDate: new Date("Dec 30, 2018"),
                dataTypes: [
                    {text: "Temperature (\xB0C)", value: 'celcius'},
                    {text: "Temperature (\xB0F)", value: 'fahrenheit'},
                    {text: 'Temperature (K)', value: 'kelvin'},
                    {text: 'Humidity (%)', value: 'humidity'}
                ],
                dataType: {text: "Temperature (\xB0C)", value: 'celcius'}
            };
        },
        computed: {
            filteredData() {
                // console.log('update data');
                // let range = [this.beginDate, this.endDate];
                let arr = this.parseData(this.stTemps[this.dataType.value]);

                // console.log(window.xMin + " " + window.xMax);
                // return arr.filter(date => date.date.getMonth() >= window.x(0) && date.date.getMonth() <= window.x(1));
                return arr.filter(date => date.date.getMonth() >= this.beginDate.getMonth() && date.date.getMonth() <= this.endDate.getMonth());

                // return this.stTemps[this.dataType.value];
            }
        },
        methods: {
            parseData(data) {
                let arr = [];
                for (let i in data) {
                    // filter through stTemps and only push into arr needed data points (within slider date range)
                    // console.log(new Date(i).getMonth());
                    arr.push({
                        date: new Date(i), //date ('key')
                        value: data[i]
                    })
                }
                return arr;
            },
            clearChart() {
                // rather than by class, may be better to select by id and have id be a prop (for multiple graphs)
                d3.select(`#${this.svgid}`).selectAll('*').remove();
            },
            drawChart() {
                // let data = this.parseData(this.data);
                let data = this.filteredData;

                var svgWidth = 600, svgHeight = 400;
                var margin = { top: 20, right: 20, bottom: 30, left: 50 };
                var width = svgWidth - margin.left - margin.right;
                var height = svgHeight - margin.top - margin.bottom;

                var svg = d3.select(`#${this.svgid}`)
                    .attr("width", svgWidth)
                    .attr("height", svgHeight);

                var g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                var x = d3.scaleTime() // scales time
                    .domain([this.beginDate, this.endDate])
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
                        .text(this.dataType.text); // text inside text tag

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
            },
            updateChart() {
                this.clearChart();
                this.drawChart();
            }
        },
        mounted() {
            this.drawChart();
        },
        created() {
            // console.log(this.id);
            this.$bus.$on('slider-update', (v1, v2) => {
                let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
                this.beginDate = new Date(`${months[v1]} 1, 2018`);
                this.endDate = new Date(`${months[v2]} 1, 2018`);
                this.clearChart();
                this.drawChart();
            })
        },
        // components: {
        //     Slider
        // }
    }
</script>

<style>

</style>
