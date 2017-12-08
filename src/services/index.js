'use strict';

import Utils from '@/directives/utils';
import Store from '@/directives/store';

var index = {
    
    banner: function(data, callback){
    	
    	Utils.Axios.deferGet( '/api/home/banner', data, callback);
    },
    location: function( data, callback){
    	
    	Utils.Axios.deferGet( '/api/home/cities', data, callback);
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
        
        Utils.Axios.deferGet( '/api/cart/list', data, callback);
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
