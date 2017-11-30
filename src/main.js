import Vue from "vue";
import Router from '@/routes/routes';
import Touch from "@/directives/touch";
import Scroll from "@/directives/scroll";
import Frame from "@/frame.vue";
import Axios from 'axios';
import '@/clear.scss';


new Vue({
    el: "#app",
    router: Router,
    components: { 
        'tm-frame': Frame
    }
});
 