import Index from "@/views/index/index.vue";
import Cart from "@/views/index/cart.vue";
import ToyDetail from "@/views/index/detail.vue";
import Location from "@/views/index/location.vue";
import Search from "@/views/index/search.vue";

export default {
	routes: [
		{ path: '/index', name: 'Index', component: Index, 
            children: [
                { path: '/index/cart', component: Cart }
            ]
        },
        { path: '/Index/location' ,name: 'Location', component: Location },
        { path: '/Index/search' ,name: 'Search', component: Search },
		{ path: '/Index/detail', name: 'ToyDetail', component: ToyDetail }
    ]
}

