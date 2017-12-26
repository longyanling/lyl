import Mine from "@/views/mine/index.vue";
import Profile from "@/views/mine/profile/profile.vue";
import ProfileBirthdate from "@/views/mine/profile/birthdate.vue";
import Order from "@/views/mine/order/list.vue";
import OrderDetails from "@/views/mine/order/details.vue";
import OrderLogistics from "@/views/mine/order/logistics.vue";
import OrderReturn from "@/views/mine/order/return.vue";
import OrderExpress from "@/views/mine/order/express.vue";
import Coupon from "@/views/mine/coupon/list.vue";
import Address from "@/views/mine/address/list.vue";
import AddressEdit from "@/views/mine/address/edit.vue";
import AddressLocation from '@/views/mine/address/location.vue';
import Setup from "@/views/mine/setup/setup.vue";
import Login from "@/views/mine/login.vue";

export default {
	routes: [
		{ path: '/mine', name: 'Mine', component: Mine },
		{ path: '/mine/profile', name: 'Profile', component: Profile,
		    children: [
                { path: '/mine/profile/birthdate', component: ProfileBirthdate }
            ]
        },
        { path: '/mine/order', name: 'Order', component: Order },
        { path: '/mine/order/details', name: 'OrderDetails', component: OrderDetails },
        { path: '/mine/order/return', name: 'OrderReturn', component: OrderReturn },
        { path: '/mine/order/express', name: 'OrderExpress', component: OrderExpress },
        { path: '/mine/order/logistics', name: 'OrderLogistics', component: OrderLogistics },
		{ path: '/mine/coupon', name: 'Coupon', component: Coupon },
        { path: '/mine/address', name: 'Address', component: Address },
		{ path: '/mine/address/edit', name: 'AddressEdit', component: AddressEdit },
		{ path: '/mine/address/location', name: 'AddressLocation', component: AddressLocation },
		{ path: '/mine/setup', name: 'Setup', component: Setup },
		{ path: '/mine/login', name: 'Login', component: Login }
    ]
}
