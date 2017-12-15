'use strict';

import Utils from '@/directives/utils';
import Store from '@/directives/store';

var index = {
    
    homeList : function(data, callback) {
    
        Utils.Axios.deferGet( '/api/home/list/v3', data, callback );
    },
    location: function( data, callback){
    	
    	Utils.Axios.deferGet( '/api/home/cities', data, callback);
    },
    cityCode : function(data, callback) {
        
        Utils.Axios.deferPost( '/api/user/update/cityCode', data, callback);
    },
    toyList: function(data, callback){
    	
    	Utils.Axios.deferGet( '/api/toy/list', data, callback);
    },
    toyDetail: function(data, callback){
        
        Utils.Axios.deferGet( '/api/toy/info', data, callback);
    },
    screen: function(data, callback){
        
        Utils.Axios.deferGet( '/api/search/filter/list/v3', data, callback);
    },
    cartList: function(data, callback){
        
        if (Store.Index.cartToys){
            callback(Store.Index.cartToys);
        } else {        	
        	Utils.Axios.deferGet( '/api/cart/list', data, function(data){
                
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
        
        Utils.Axios.deferPost( '/api/cart/checkAndAdd', data, callback);
    },
    cartClear: function(data, callback){
        
        Utils.Axios.deferPost( '/api/cart/clear', data, callback);
    },
    buyCheck: function(data, callback){
        
        Utils.Axios.deferPost( '/api/order/buy/check', data, callback);
    },
    presubmit: function(data, callback){
        
        Utils.Axios.deferPost( '/api/order/presubmit', data, callback);
    },
    submit: function(data, callback){

        Utils.Axios.deferPost( '/api/order/submit', data, callback);
    },
    payCheck: function(data, callback){

        Utils.Axios.deferGet('/api/order/pay/check', data, callback);
    },
    pay: function(data, callback){
      
      Utils.Axios.deferPost( '/api/order/pay/jd', data, callback);
    },
    searchhot: function(data, callback){
        
        if (Store.Index.searchHot){
            callback(Store.Index.searchHot);
        } else {        	
        	Utils.Axios.deferPost('/api/on/start', { }, function(data){
                
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
