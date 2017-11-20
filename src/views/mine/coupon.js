'use strict';

import Utils from '@/directives/utils'
import Toast from '@/directives/toast'
import MineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'mine-coupon',
        mounted: function(){
	        
	        var self = this;
	        
	        MineAPI.coupon(function( data ){
	        	
	        	var coupons;
	        	
	        	if (data.code == 0){
	        		
	        		coupons = (data.data || {}).data || [];
	        		
	        		for(var i = 0; i<coupons.length; i++){
	        			self.couponItems.push(coupons[i]);
	        		}
	        	} else {
	        		Toast.show(data.msg);
	        	}
	        });
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                 couponItems: []
            };
        },
        methods: {
            goToToy: function(){
        
                this.$router.push( "/index" );
            }
        },
        filters: {
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