'use strict';

import Utils from '@/directives/utils';
import Store from '@/directives/store';

var index = {
    
    banner: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.get( 'home/banner', data, callback);
        }, 1);
    },
    location: function( data, callback){
        setTimeout(function(){
            
            Utils.Axios.get( '/home/cities', data, callback);
        }, 1);
    },
    toyList: function(data, callback){

        setTimeout(function(){
            
            Utils.Axios.get( '/toy/list', data, callback);
        }, 1);
    },
    toyDetail: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.get( '/toy/info', data, callback);
        }, 1);
    },
    screen: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.get( '/search/filter/list/v3', data, callback);
        }, 1);
    },
    cartList: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.get( '/cart/list', data, callback);
        }, 1);
    },
    cartAdd: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.post( '/cart/checkAndAdd', data, callback);
        }, 1);
    },
    cartClear: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.post( '/cart/clear', data, callback);
        }, 1);
    },
    buyCheck: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.post( '/order/buy/check', data, callback);
        }, 1);
    },
    presubmit: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.post( '/order/presubmit', data, callback);
        }, 1);
    },
    submit: function(data, callback){
        
        setTimeout(function(){
            
            Utils.Axios.post( 'order/submit', data, callback);
        }, 1);
    },
    searchhot: function(data, callback){
        
        if (Store.Index.searchHot){
            callback(Store.Index.searchHot);
        } else {
            setTimeout(function(){
                
                Utils.Axios.post('/on/start', { }, function(data){
                    
                    if (data.code == 0 ){
                        Store.Index.searchHot = data.data || [];
                        callback(Store.Index.searchHot);   
                    } else {
                        console.log('请求失败');
                    }
                });
            }, 1);
        }
    }
    
};

export default index;
