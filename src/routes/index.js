import Index from "@/views/index/index.vue";
import Cart from "@/views/index/cart/list.vue";
import Activity from "@/views/index/activity/activity.vue";
import ToyDetail from "@/views/index/toy/detail.vue";
import Location from "@/views/index/location/list.vue";
import Search from "@/views/index/search/search.vue";
import Screen from "@/views/index/screen/screen.vue";
import Confirm from "@/views/index/order/confirm.vue";
import ConfirmResult from "@/views/index/order/result/result.vue";
import ConfirmCoupon from "@/views/index/order/coupon/pop_list.vue";
import ConfirmAddress from "@/views/index/order/address/pop_list.vue";
import ConfirmAddressEdit from "@/views/index/order/address/pop_edit.vue";
import ConfirmAddressLocation from "@/views/index/order/address/pop_location.vue";
import ConfirmDistribution from "@/views/index/order/distribution/pop_list.vue";
import ConfirmLease from "@/views/index/order/lease/pop_list.vue";

export default {
	routes: [
		{ path: '/index', name: 'Index', component: Index, 
            children: [
                { path: '/index/cart', component: Cart },
                { path: '/index/activity', component: Activity }
            ]
        },
        { path: '/index/location' ,name: 'Location', component: Location },
        { path: '/index/screen' ,name: 'Screen', component: Screen ,
            children: [
                { path: '/index/screen/cart', component: Cart }
            ]
        },
        { path: '/index/search' ,name: 'Search', component: Search,
            children: [
                { path: '/index/search/cart', component: Cart }
            ]
        },
		{ path: '/index/detail', name: 'ToyDetail', component: ToyDetail,
		  children: [
                { path: '/index/detail/cart', component: Cart }
            ]
		},
		{ path: '/index/confirm', name: 'Confirm', component: Confirm ,
            children: [
                { path: '/index/confirm/coupon', component: ConfirmCoupon },
                { path: '/index/confirm/address', component: ConfirmAddress },
                { path: '/index/confirm/address/edit', component: ConfirmAddressEdit },
                { path: '/index/confirm/address/location', component: ConfirmAddressLocation },
                { path: '/index/confirm/distribution', component: ConfirmDistribution },
                { path: '/index/confirm/lease', component: ConfirmLease }
            ]
        },
        { path: '/index/result' , name: 'Result', component: ConfirmResult }
    ]
}

