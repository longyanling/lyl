import Mine from "@/views/mine/index.vue";
import MineProfile from "@/views/mine/profile.vue";
import MineProfileDate from "@/views/mine/pop_date.vue";
import MineOrder from "@/views/mine/order.vue";
import MineCoupon from "@/views/mine/coupon.vue";
import MineOrderConfirm from "@/views/mine/confirm.vue";
import MineAddressAdd from "@/views/mine/addressAdd.vue";
import MineAddressList from "@/views/mine/addressList.vue";
import MineOrderConfirmAddressAdd from "@/views/mine/pop_addressAdd.vue";
import MineOrderConfirmAddressList from "@/views/mine/pop_addressList.vue";
import MineOrderConfirmDistribution from "@/views/mine/pop_distribution.vue";
import MineOrderConfirmLease from "@/views/mine/pop_lease.vue";
import MineOrderConfirmCoupon from "@/views/mine/pop_coupon.vue";
import MineOrderDetails from "@/views/mine/details.vue";
import MineOrderExpress from "@/views/mine/express.vue";
import MineOrderLogistics from "@/views/mine/logistics.vue";
import MineOrderReturn from "@/views/mine/return.vue";

export default {
	routes: [
		{ path: '/mine', name: 'Mine', component: Mine },
		{ path: '/mine/coupon', name: 'MineCoupon', component: MineCoupon },
		{ path: '/mine/addressAdd', name: 'MineAddressAdd', component: MineAddressAdd },
        { path: '/mine/addressList', name: 'MineAddressList', component: MineAddressList },
		{ path: '/mine/profile', name: 'MineProfile', component: MineProfile ,
		    children: [
                { path: '/mine/profile/date', component: MineProfileDate }
            ]
        },
        { path: '/mine/order/confirm', name: 'MineOrderConfirm', component: MineOrderConfirm ,
            children: [
                { path: '/mine/order/confirm/addressAdd', component: MineOrderConfirmAddressAdd },
                { path: '/mine/order/confirm/addressList', component: MineOrderConfirmAddressList },
                { path: '/mine/order/confirm/distribution', component: MineOrderConfirmDistribution },
                { path: '/mine/order/confirm/lease', component: MineOrderConfirmLease },
                { path: '/mine/order/confirm/coupon', component: MineOrderConfirmCoupon }
            ]
        },
        { path: '/mine/order', name: 'MineOrder', component: MineOrder },
        { path: '/mine/order/details', name: 'MineOrderDetails', component: MineOrderDetails },
        { path: '/mine/order/express', name: 'MineOrderExpress', component: MineOrderExpress },
        { path: '/mine/order/logistics', name: 'MineOrderLogistics', component: MineOrderLogistics },
        { path: '/mine/order/return', name: 'MineOrderReturn', component: MineOrderReturn }
    ]
}
