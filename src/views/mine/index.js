'use strict';
import Toast from '@/directives/toast';
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

	                if (data.code == 0) {
	                    self.userInfoItem = data.data.user;
	                    self.babyInfoItem = data.data.babys[0];
	                    
	                     
	                } else {
	                    Toast.show(data.msg);
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