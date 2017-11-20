import Vue from 'vue';
import VueRouter from 'vue-router';

import Toy from "@/routes/index.js";
import Mine from "@/routes/mine.js";

Vue.use(VueRouter)

var Routers = new VueRouter({
	hashbang: true,
	history: true,

    routes: [ { path: "/", redirect: "/index" } ]
    	.concat(Mine.routes)
	    .concat(Toy.routes)
});

export default Routers;