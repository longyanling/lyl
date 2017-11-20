'use strict';

import Axios from 'axios';
import Toast from '@/directives/toast'

var _default = (function(){

	var request = function( url, data, callback ){
	
		var self = this;
		
		setTimeout(function(){
				
	        Axios.get(url, { 
	        	params: data 
	        }).then(function (response) {
	        	
	            callback && callback(response.data);
	        }.bind(self))
	        .catch(function (error) {
	        	
	        	Toast.show(error);
	        });
		}, 10);
	};

	return {
		profile: function( data, callback ){
			
			request('/user/profile/jdv2' , data, callback);
		},
		coupon: function( callback ){
			
			request('/coupon/list', { }, callback);
		}
	};
})();

export default _default;