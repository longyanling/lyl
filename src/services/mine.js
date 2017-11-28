'use strict';

import MD5 from '@/directives/md5';
import Utils from '@/directives/utils';

var mine = {
	
	login: function(callback){
		
		setTimeout(function(){
			
			Utils.Axios.post('/user/login', {
					'phone': '17610007876',
					'pwd': MD5('a123456'),
					'cityCode': '010'
				}, callback);
		}, 1);
	},
	
	profile: function(callback){
		
		setTimeout(function(){
			
			Utils.Axios.post('/user/profile/jdv2', { }, callback);
		}, 1);
	},
	
	update: function(data, callback){
		
		setTimeout(function(){
			
			Utils.Axios.post('/user/profile/update', data, callback);
		}, 1);
	},
	
	orders: function(callback){
		
		setTimeout(function(){
			
			Utils.Axios.post('/order/list/v2', { }, callback);
		}, 1);
	},
	
	coupons: function(callback){
		
		setTimeout(function(){
			
			Utils.Axios.post('/coupon/list', { }, callback);
		}, 1);
	}
};

export default mine;
