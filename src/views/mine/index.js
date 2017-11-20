'use strict';
import Axios from 'axios';
var _default = (function(){

	return {
		name: 'mine-index',
		mounted: function(){
			var self = this;
        
            Axios.get('/user/profile/jdv2', {
                params : {
                    uid : 73486241289,
                }
            })
            .then(function (response) {
                var data = response.data;
                if (data.code == 0) {
                    self.userInfoItem = data.data.user;
                    self.babyInfoItem = data.data.babys[0];     
                } else {
                    console.log(results);
                }
            })
            .catch(function (error) {
                console.log(error);
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