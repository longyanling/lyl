'use strict';

import mineAPI from "@/services/mine-service";

var _default = (function(){

	return {
		name: 'mine-index',
		mounted: function(){
			
			var self = this;
        
        	mineAPI.profile(
        		{ 
        			uid : 73486241289 
        		}, 
        		function( data ){
	        		
	        		console.log( data );
	                if (data.code == 0) {
	                    self.userInfoItem = data.data.user;
	                    self.babyInfoItem = data.data.babys[0];
	                    
	                    console.log(self.babyInfoItem)
	                     
	                } else {
	                    console.log(results);
	                }
	        	});
		},
		destoryed: function(){
			
		},
		data: function(){

            return {
                userInfoItem : [],
                babyInfoItem : [],
            };
		},
		methods: {
		    goToProfile : function (){
		        this.$router.push('/mine/profile');
		    },
		    goToOrder : function (){
		        this.$router.push('/mine/order');
		    },
		    goToCoupon : function (){
		        this.$router.push('/mine/coupon');
		    },
		    goToAddressList : function (){
                this.$router.push('/mine/AddressList');
            }
			
		}
	}
})();

export default _default;