'use strict';

import Toast from '@/directives/toast';
import API from "@/services/api";

var _default = (function(){

	return {
		name: 'mine-index',
		mounted: function(){
			
			var vm = this;
			API.Mine.profile(function(data){
				if(data.code == 0){
				    vm.loginState = true;
    				vm.userInfo = data.data ? (data.data.user || {}) : {};
    			    vm.babyInfo = data.data ? (data.data.babys && data.data.babys.length ? data.data.babys[0] : {}) : {};
			    }else {
			        vm.loginState = false;
			    }
		    });
		},
		data: function(){

            return {
                userInfo: {},
                babyInfo: {},
                loginState : false,
                userMenus: [
                
                	{
                		text: '我的订单',
                		url: '/mine/order',
                		icon: 'https://ts.zlimg.com/v2/h5/jd/mine_order.png'
                	},
                	{
                		text: '我的优惠券',
                		url: '/mine/coupon',
                		icon: 'https://ts.zlimg.com/v2/h5/jd/mine_coupon.png'
                	}
                ],
                systemMenus: [
                	{
                		text: '常用地址',
                		url: '/mine/address',
                		icon: 'https://ts.zlimg.com/v2/h5/jd/mine_address.png'
                	},
                	{
                		text: '常见问题',
                		url: '/mine/faq',
                		icon: 'https://ts.zlimg.com/v2/h5/jd/mine_problem.png'
                	},
//              	{
//              		text: '关于我们',
//              		url: '/mine/about',
//              		icon: 'https://ts.zlimg.com/v2/h5/jd/mine_omine.png'
//              	}
//                  {
//                      text: '设置',
//                      url: '/mine/setup',
//                      icon: 'https://ts.zlimg.com/v2/h5/jd/mine_setting.png'
//                  }
                ]
            };
		},
		methods: {
			go: function(e, url){
				
				if(url == '/mine/faq' ){
				    window.location = 'https://www.toysuperman.com/faq.html';
				}else {
				    this.$router.push(url);
				}
			},
			login: function(){
				
				API.Mine.login(function(data){
					
					console.log(data);
				});
			}
		}
	}
})();

export default _default;