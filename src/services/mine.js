'use strict';

import MD5 from '@/directives/md5';
import Store from '@/directives/store';
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
	
	orderDetail: function(data, callback){
		
		setTimeout(function(){
			
			Utils.Axios.post('/order/detail', data, callback);
		}, 1);
	},
	
	express: function(callback){
            
		setTimeout(function(){
			
			Utils.Axios.post('/order/express/companies', {}, callback);
		}, 1);
    },
    
    logistics: function( data, callback ){
           
		setTimeout(function(){
			
			Utils.Axios.post('/order/express/list', data, callback);
		}, 1); 
    },
	
	coupons: function(callback){
		
        if (Store.Mine.coupons){
            callback(Store.Mine.coupons);
        } else {
            setTimeout(function(){
                
                Utils.Axios.post('/coupon/list', { }, function(data){
                    
                    if (data.code == 0 ){
                        Store.Mine.coupons = data.data && data.data.data ? data.data.data : [];
                        callback(Store.Mine.coupons);   
                    } else {
                        console.log('请求失败');
                    }
                });
            }, 1);
        }
	},
	
	address: function(callback){
		
		if (Store.Mine.address){
		    callback(Store.Mine.address);
		} else {
    		setTimeout(function(){
    			
    			Utils.Axios.post('/address/list', { }, function(data){
    			    
    			    if (data.code == 0 ){
                        Store.Mine.address = data.data || [];
                        callback(Store.Mine.address);   
    			    } else {
    			        console.log('请求失败');
    			    }
    			});
    		}, 1);
		}
	},
	
	addressInsert : function( data, callback ){
            
        setTimeout(function(){
            
            Utils.Axios.post('/address/gd/insert', data, callback);
        }, 1);
    },
    
    addressUpdata : function( data, callback ){
            
        setTimeout(function(){
            
            Utils.Axios.post('/address/gd/update', data, callback);
        }, 1);
    },
    
    addressDelete : function( data, callback ){
            
        setTimeout(function(){
            
            Utils.Axios.post('/address/delete', data, callback);
        }, 1);
    }
};

export default mine;
