import Vue from 'vue';
// import OptionMenus from './components/OptionMenus';
import Graph from './components/Graph.vue';
import Slider from './components/Slider.vue';


// values for slider
window.sliderValues = {};
window.x = {}; //null;
window.selRange = {}; //null;
window.xMin = 0;
window.xMax = 11;

window.bus = new Vue();
Vue.prototype.$bus = window.bus;

new Vue({
    el: '#app',
    components: {
        Graph,
        Slider
    }
})
