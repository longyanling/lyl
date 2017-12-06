'use strict';

import MD5 from '@/directives/md5';
import Store from '@/directives/store';
import Utils from '@/directives/utils';

var mine = {
	
	login: function(data, callback){
		
		Utils.Axios.deferPost('/api/user/login', data, callback);
	},
	
	profile: function(callback){
		
		Utils.Axios.deferPost('/api/user/profile/jdv2', { }, callback);
	},
	
	update: function(data, callback){
		
		Utils.Axios.deferPost('/api/user/profile/update', data, callback);
	},
	
	orders: function(callback){
		
		Utils.Axios.deferPost('/api/order/list/v2', { }, callback);
	},
	
	orderDetail: function(data, callback){
		
		Utils.Axios.deferPost('/api/order/detail', data, callback);
	},
	
	express: function(callback){
            
        Utils.Axios.deferPost('/api/order/express/companies', {}, callback);
    },
    
    logistics: function( data, callback ){
    	
    	Utils.Axios.deferPost('/api/order/express/list', data, callback);
    },
	
	coupons: function(callback){
		
        if (Store.Mine.coupons){
            callback(Store.Mine.coupons);
        } else {
        	Utils.Axios.deferPost('/api/coupon/list', { }, function(data){
        		
        		if (data.code == 0 ){
                    Store.Mine.coupons = data.data && data.data.data ? data.data.data : [];
                    callback(Store.Mine.coupons);   
                } else {
                    console.log('请求失败');
                }
           });
        }
	},
	
	address: function(callback){
		
		if (Store.Mine.address){
		    callback(Store.Mine.address);
		} else {
			Utils.Axios.deferPost('/api/address/list', { }, function(data){
			    
			    if (data.code == 0 ){
                    Store.Mine.address = data.data || [];
                    callback(Store.Mine.address);   
			    } else {
			        console.log('请求失败');
			    }
			});
		}
	},
	
	addressInsert : function( data, callback ){
		
		Utils.Axios.deferPost('/api/address/gd/insert', data, callback);
    },
    
    addressUpdata : function( data, callback ){
    	
    	Utils.Axios.deferPost('/api/address/gd/update', data, callback);
    },
    
    addressDelete : function( data, callback ){
    	
    	Utils.Axios.deferPost('/api/address/delete', data, callback);
    }
};

export default mine;
