import Vue from 'vue';
import VueRouter from 'vue-router';

import Index from "@/routes/index.js";
import Mine from "@/routes/mine.js";

Vue.use(VueRouter)

var paths = [];
var Routers = new VueRouter({
	hashbang: true,
	history: true,

    routes: [ { path: "/", redirect: "/index" } ]
    	.concat(Mine.routes)
	    .concat(Index.routes)
});

Routers.beforeEach(function(to, from, next){
	
	for ( var i = 0; i < paths.length; i++){
		if (paths[i] == to.fullPath){
			return;
		}
	}
	paths.push(to.fullPath);
	document.documentElement.scrollTop = 0;
	document.body.scrollTop = 0;
	next();
});

export default Routers;