'use strict';

import Axios from 'axios';
import Toast from '@/directives/toast';
import MD5 from '@/directives/md5'

var _default = (function(){

	var buildData = function( data ){
		
		var userAgent = navigator.userAgent,
			isAndroid = /Android|HTC/i.test(userAgent) || !!(navigator["platform"] + "").match(/Linux/i),
  			isIOS = !isAndroid && /iPad|iPod|iPhone/i.test(userAgent);
  			
  		data = data || {};
		data['av'] = '3.0.0';
		data['cv'] = '2.0.0';
		data['client'] = (isAndroid ? 'jd-android' : ( isIOS ? 'jd-ios' : 'jd-other' ));
		
		return data;
	};
	
	var reserlizeData = function( data ){
		
		var querys = [];
		for(var key in data){
			querys.push(key + '=' + encodeURIComponent(data[key]));
		}
		return querys.join('&');
	};

	var httpGet = function( url, data, callback ){
	
		var self = this;
		setTimeout(function(){
				
	        Axios.get(url, { 
	        	params: buildData(data) 
	        }).then(function (response) {
	        	
	            callback && callback(response.data);
	        }.bind(self))
	        .catch(function (error) {
	        	
	        	Toast.show(error);
	        });
		}, 10);
	};

	var httpPost = function( url, data, callback ){
	
		var self = this;
		
		setTimeout(function(){
				
	        Axios.post(url, reserlizeData(buildData(data)), {
	        	headers: {
	        		'Content-Type': 'application/x-www-form-urlencoded'
	        	}
	        }).then(function (response) {
	        	
	            callback && callback(response.data);
	        }.bind(self))
	        .catch(function (error) {
	        	
	        	Toast.show(error);
	        });
		}, 10);
	};
	return {
		login: function( callback ){
			
			httpPost(
				'/user/login',
				{
//					'phone': '17610007876',
//					'pwd': MD5('a123456'),
                    'phone' : '15901135082',
                    'pwd' : MD5('shenxu'),
					'cityCode': '010'
				}, 
				callback);
		},
		profile: function( data, callback ){
			
			httpGet('/user/profile/jdv2' , data, callback);
		},
		updateProfile: function( avatar, name, babySex, babyBirthDate, callback ){
			
			httpPost(
				'/user/profile/update',
				{
					'avatar':avatar,
					'name':name,
					'babySex': babySex,
					'babyBD': babyBirthDate
				}, 
				callback);
		},
		coupon: function( callback ){
			
			httpGet('/coupon/list', {}, callback);
		},
		orderList : function( data, callback ){
            
            httpGet('/order/list/v2', data, callback);
        },
        orderDetail : function( data, callback ){
            
            httpGet('/order/detail', data, callback);
        },
        logistics : function( data, callback ){
            
            httpGet('/order/express/list', data, callback);
        },
        express : function( data, callback ){
            
            httpGet('order/express/companies', data, callback);
        },
        addressList : function( data, callback ){
            
            httpGet('/address/list', data, callback);
        }
	};
})();

export default _default;