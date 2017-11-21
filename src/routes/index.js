import Index from "@/views/index/index.vue";
import Cart from "@/views/index/cart.vue";
import ToyDetail from "@/views/index/detail.vue";
import Location from "@/views/index/location.vue";
import Search from "@/views/index/search.vue";
import Confirm from "@/views/index/confirm.vue";
import ConfirmAddressAdd from "@/views/index/order/pop_addressAdd.vue";
import ConfirmAddressList from "@/views/index/order/pop_addressList.vue";
import ConfirmDistribution from "@/views/index/order/pop_distribution.vue";
import ConfirmLease from "@/views/index/order/pop_lease.vue";
import ConfirmCoupon from "@/views/index/order/pop_coupon.vue";

export default {
	routes: [
		{ path: '/index', name: 'Index', component: Index, 
            children: [
                { path: '/index/cart', component: Cart }
            ]
        },
        { path: '/index/location' ,name: 'Location', component: Location },
        { path: '/index/search' ,name: 'Search', component: Search },
		{ path: '/index/detail', name: 'ToyDetail', component: ToyDetail },
		{ path: '/index/confirm', name: 'Confirm', component: Confirm ,
            children: [
                { path: '/index/confirm/addressAdd', component: ConfirmAddressAdd },
                { path: '/index/confirm/addressList', component: ConfirmAddressList },
                { path: '/index/confirm/distribution', component: ConfirmDistribution },
                { path: '/index/confirm/lease', component: ConfirmLease },
                { path: '/index/confirm/coupon', component: ConfirmCoupon }
            ]
        },
    ]
}

