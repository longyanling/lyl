'use strict';

import Store from '@/directives/store';
import Utils from '@/directives/utils';

//var prefix = '/api';
var prefix = '';

var mine = {
	
	login: function(data, callback){
		
		Utils.Axios.deferPost(prefix + '/user/login', data, callback);
	},
	
	profile: function(callback){
		
		Utils.Axios.deferPost(prefix + '/user/profile/jdv2', { }, callback);
	},
	
	update: function(data, callback){
		
		Utils.Axios.deferPost(prefix + '/user/profile/update', data, callback);
	},
	
	orders: function(callback){
		
		Utils.Axios.deferPost(prefix + '/order/list/v2', { }, callback);
	},
	
	cancel: function(data, callback){
        
        Utils.Axios.deferPost(prefix + '/order/cancel', data, callback);
    },
	
	delete: function(data, callback){
        
        Utils.Axios.deferPost(prefix + '/order/delete', data, callback);
    },
	
	orderDetail: function(data, callback){
		
		Utils.Axios.deferPost(prefix + '/order/detail', data, callback);
	},
	
	express: function(callback){
            
        Utils.Axios.deferPost(prefix + '/order/express/companies', {}, callback);
    },
    
    expressSave: function( data, callback){
        Utils.Axios.deferPost(prefix + '/order/express/save', data, callback);
    },
    
    logistics: function( data, callback ){
    	
    	Utils.Axios.deferPost(prefix + '/order/express/list', data, callback);
    },
	
	coupons: function(callback){
		
        if (Store.Mine.coupons){
            callback(Store.Mine.coupons);
        } else {
        	Utils.Axios.deferPost(prefix + '/coupon/list', { }, function(data){
        		
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
			Utils.Axios.deferPost(prefix + '/address/list', { }, function(data){
			    
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
		
		Utils.Axios.deferPost(prefix + '/address/gd/insert', data, callback);
    },
    
    addressUpdata : function( data, callback ){

    	Utils.Axios.deferPost(prefix + '/address/gd/update', data, callback);
    },
    
    addressDelete : function( data, callback ){
    	
    	Utils.Axios.deferPost(prefix + '/address/delete', data, callback);
    }
};

export default mine;
