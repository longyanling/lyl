'use strict';

import Utils from '@/directives/utils';
import Store from '@/directives/store';

var prefix = '';

var index = {
    
    homeList : function(data, callback) {
    
        Utils.Axios.deferGet(prefix + '/home/list/v3', data, callback );
    },
    location: function( data, callback){
    	
    	Utils.Axios.deferGet( prefix + '/home/cities', data, callback);
    },
    cityCode : function(data, callback) {
        
        Utils.Axios.deferPost( prefix + '/user/update/cityCode', data, callback);
    },
    toyList: function(data, callback){
    	
    	Utils.Axios.deferGet( prefix + '/toy/list', data, callback);
    },
    toyDetail: function(data, callback){
        
        Utils.Axios.deferGet( prefix +'/toy/info', data, callback);
    },
    screen: function(data, callback){
        
        Utils.Axios.deferGet( prefix +'/search/filter/list/v3', data, callback);
    },
    cartList: function(data, callback){
        
        if (Store.Index.cartToys){
            callback(Store.Index.cartToys);
        } else {        	
        	Utils.Axios.deferGet( prefix +'/cart/list', data, function(data){
                
                if (data.code == 0 ){
                    Store.Index.cartToys = data.data || [];
                    callback(Store.Index.cartToys);   
                } else {
                    console.log('请求失败');
                }
        	});
        }
    },
    cartAdd: function(data, callback){
        
        Utils.Axios.deferPost( prefix +'/cart/checkAndAdd', data, function(data){
        	
        	if (data.code ==0 ){
        		Store.Index.cartToys = null;	
        	}
        	callback(data);
        });
    },
    cartClear: function(data, callback){
        
        Utils.Axios.deferPost( prefix +'/cart/clear', data, function(data){
        	
        	if (data.code ==0 ){
        		Store.Index.cartToys = null;	
        	}
        	callback(data);
        });
    },
    buyCheck: function(data, callback){
        
        Utils.Axios.deferPost( prefix +'/order/buy/check', data, callback);
    },
    presubmit: function(data, callback){
        
        Utils.Axios.deferPost( prefix +'/order/presubmit', data, callback);
    },
    submit: function(data, callback){

        Utils.Axios.deferPost( prefix +'/order/submit', data, callback);
    },
    payCheck: function(data, callback){

        Utils.Axios.deferGet( prefix +'/order/pay/check', data, callback);
    },
    pay: function(data, callback){
      
      Utils.Axios.deferPost( prefix +'/order/pay/jd', data, callback);
    },
    searchhot: function(data, callback){
        
        if (Store.Index.searchHot){
            callback(Store.Index.searchHot);
        } else {        	
        	Utils.Axios.deferPost( prefix +'/on/start', { }, function(data){
                
                if (data.code == 0 ){
                    Store.Index.searchHot = data.data || [];
                    callback(Store.Index.searchHot);   
                } else {
                    console.log('请求失败');
                }
            });
        }
    }
    
};

export default index;
