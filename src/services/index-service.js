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
//                  'phone': '17610007876',
//                  'pwd': MD5('a123456'),
                    'phone' : '15901135082',
                    'pwd' : MD5('shenxu'),
                    'cityCode': '010'
                }, 
                callback);
        },
        profile: function( data, callback ){
            
            httpGet( '/user/profile/jdv2' , data, callback);
        },
        banner: function( data, callback ){
            
            httpGet( 'home/banner', data, callback);
        },
        toyList : function( data, callback ){
            
            httpGet( '/toy/list' , data, callback);
        },
        toyDetail : function( data, callback ){
            
            httpGet( '/toy/info' , data, callback);
        },
        screen : function( data, callback ){
            
            httpGet( '/search/filter/list/v3' , data, callback);
        },
        cartList : function( data, callback ){
            
            httpGet( '/cart/list', data, callback);
        },
        cartAdd : function( data, callback ){
            
            httpPost( '/cart/checkAndAdd', data, callback);
        },
        cartClear : function( data, callback ){
            httpPost('/cart/clear', data, callback);
        },
        addressList : function( data, callback ){
            
            httpGet( '/address/list', data, callback);
        },
        addressInsert : function( data, callback){

            httpPost( 'gd/insert', data, callback);
        },
        addressUpdata : function( data, callback){

            httpPost( 'gd/updata', data, callback);
        },
        buyCheck : function( data, callback ){
            
            httpPost( '/order/buy/check', data, callback);
        },
        presubmit : function( data, callback ){
            
            httpPost( '/order/presubmit', data, callback);
        },
        addressDelete : function( data, callback ){
            
            httpPost( '/address/delete', data, callback);
        },
        submit : function( data, callback ){
            
            httpPost( 'order/submit', data, callback);
        }
            
    };
})();

export default _default;