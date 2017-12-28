'use strict';

import Utils from '@/directives/utils';
import API from "@/services/api";

var _default = (function(){

    return {
        name: 'mine-coupon',
        mounted: function(){
	        
	        var vm = this;
	        vm.loadingstate = true;
	        
	        API.Mine.coupons(function(data){
	        	
	        	vm.couponItems = data;
	        	vm.loadingstate = false;
	        });
        },
        data: function(){
            
            return {
                loadingstate: true,
                 couponItems: []
            };
        },
        methods: {
        	go: function(e, url){
        		
        		this.$router.push(url);
        		_hmt.push(["_trackEvent", "link", "click", "我的-优惠券-返回首页"]);
        	}
        },
        filters: {
        	money: function(value){
        		
        		return Math.floor(value / 1000);
        	},
        	surplus: function (value) {
        		
        		return Math.floor((Utils.Date.fromTicks(value) - new Date()) / 24 / 3600 / 1000);
        	},
        	expire: function (value) {
        		
        		return Utils.Date.toString(Utils.Date.fromTicks(value), 'yyyy-MM-dd');
        	}
        }
    }
})();

export default _default;