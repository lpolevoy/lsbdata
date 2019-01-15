<!-- <template>
    <div>
        <select class="d-block" v-model="dataType" @change="updateChart">
            <option v-for="type in dataTypes" :value="type">{{ type.text }}</option>
        </select>
      </div>
</template>


<script>
    import * as d3 from 'd3'; // can be more specific
    import axios from 'axios';
    // import Slider from './Slider.vue'

    export default {
        props: ['svgid'],
        data() {
            return {
                // would probably be best as prop data or stored elsewhere and read from there
                dataTypes: [
                    {text: "Temperature (\xB0C)", value: 'celcius'},
                    {text: "Temperature (\xB0F)", value: 'fahrenheit'},
                    {text: 'Temperature (K)', value: 'kelvins'},
                    // {text: 'Humidity (%)', value: 'humidity'},
                    {text: 'Cloudiness (%)', value: 'cloudiness'}
                ],
                dataType: {text: "Temperature (\xB0C)", value: 'celcius'}
            };
        },
        methods: {
        },
        mounted() {

        }
    }



</script>

<style>

</style> -->
