import Mine from "@/views/mine/index.vue";
import Profile from "@/views/mine/profile/profile.vue";
import ProfileBirthdate from "@/views/mine/profile/birthdate.vue";
import Order from "@/views/mine/order/list.vue";
import Coupon from "@/views/mine/coupon/list.vue";
import MineAddressAdd from "@/views/mine/addressAdd.vue";
import MineAddressList from "@/views/mine/addressList.vue";
import MineOrderDetails from "@/views/mine/details.vue";
import MineOrderExpress from "@/views/mine/express.vue";
import MineOrderLogistics from "@/views/mine/logistics.vue";
import MineOrderReturn from "@/views/mine/return.vue";

export default {
	routes: [
		{ path: '/mine', name: 'Mine', component: Mine },
		{ path: '/mine/profile', name: 'Profile', component: Profile ,
		    children: [
                { path: '/mine/profile/birthdate', component: ProfileBirthdate }
            ]
        },
        { path: '/mine/order/list', name: 'Order', component: Order },
		{ path: '/mine/coupon/list', name: 'Coupon', component: Coupon },
		
		{ path: '/mine/addressAdd', name: 'MineAddressAdd', component: MineAddressAdd },
        { path: '/mine/addressList', name: 'MineAddressList', component: MineAddressList },
        { path: '/mine/order/details', name: 'MineOrderDetails', component: MineOrderDetails },
        { path: '/mine/order/express', name: 'MineOrderExpress', component: MineOrderExpress },
        { path: '/mine/order/logistics', name: 'MineOrderLogistics', component: MineOrderLogistics },
        { path: '/mine/order/return', name: 'MineOrderReturn', component: MineOrderReturn }
    ]
}
