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
		}
	};
})();

export default _default;