'use strict';

import Utils from '@/directives/utils';
import API from "@/services/api";

var _default = (function(){

    return {
        name: 'mine-coupon',
        mounted: function(){
	        
	        var vm = this;
	        
	        API.Mine.coupons(function(data){
	        	
	        	vm.couponItems = data;
	        });
        },
        data: function(){
            
            return {
                 couponItems: []
            };
        },
        methods: {
        	go: function(e, url){
        		
        		this.$router.push(url);
        	}
        },
        filters: {
        	money: function(value){
        		
        		return Math.floor(value / 1000);
        	},
        	surplus: function (value) {
        		
        		return Math.floor((Utils.dateFromTicks(value) - new Date()) / 24 / 3600 / 1000);
        	},
        	expire: function (value) {
        		
        		return Utils.dateFormat(Utils.dateFromTicks(value), 'yyyy-MM-dd');
        	}
        }
    }
})();

export default _default;