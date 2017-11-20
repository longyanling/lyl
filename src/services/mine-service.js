'use strict';

import Axios from 'axios';

var _default = (function(){

	var request = function( url, data, callback ){
	
        Axios.get(url, { 
        	params: data 
        }).then(function (response) {
            var data = response.data;
            callback && callback(data);
        }.bind(this))
        .catch(function (error) {
            console.log(error);
        });
	};

	return {
		profile: function( data, callback ){
			
			request('/user/profile/jdv2' , data, callback);
		},
		coupon: function( callback ){
			
			request('/coupon/list', callback);
		},
		orderList : function( data, callback ){
            
            request('/order/list/v2', data, callback);
        },
        orderDetail : function( data, callback ){
            
            request('/order/detail', data, callback);
        },
        logistics : function( data, callback ){
            
            request('/order/express/list', data, callback);
        },
        addressList : function( data, callback ){
            
            request('/address/list', data, callback);
        },
	};
})();

export default _default;