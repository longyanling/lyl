'use strict';

import Toast from '@/directives/toast'
import MineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'mine-coupon',
        mounted: function(){
	        
	        var self = this;
	        MineAPI.coupon(function( data ){
	        	
	        	if (data.code == 0){
	        	var coupons = (data.data || {}).data || [];
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
        
                this.$router.push( "/toy" );
            }
        }
    }
})();

export default _default;