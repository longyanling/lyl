'use strict';

import Axios from 'axios';

var utils = (function(){
	
	//	客户端变量
	var client = (function(userAgent){
		
		return {
			android: /Android|HTC/i.test(userAgent) || !!(navigator["platform"] + "").match(/Linux/i),
			iOS: (!/Android|HTC/i.test(userAgent)) && /iPad|iPod|iPhone/i.test(userAgent)
		};
	})(navigator.userAgent);
	
	//	日期格式转换方法
	var date = {
		
		fromString: function(date){
			
			var datepart = /[0-9]{2,4}-[0-9]{1,2}-[0-9]{1,2}/.exec(date);
			var timepart = /[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}/.exec(date);
			var datearray, year, month, day;
			var timearray, hour, minute, second;
			if (datepart.length){
				datearray = datepart[0].split('-');
				year = parseInt(datearray[0], 10);
				month = parseInt(datearray[1], 10);
				day = parseInt(datearray[2], 10);
			}
			if (timepart.length){
				timearray = timepart[0].split(':');
				hour = parseInt(timearray[0], 10);
				minute = parseInt(timearray[1], 10);
				second = parseInt(timearray[2], 10);
			}
			return new Date(year,month,day,hour,minute,second );
		},
		
		fromTicks: function(ticks){
			
			return new Date(parseInt(ticks, 10)) || new Date();  
		},
		
		toString: function(date, template){
			
			date = date || new Date();
			
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours() ;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			
			template = template.replace(/yyyy/g, year);
			template = template.replace(/MM/g, (month > 9 ? month : '0' + month) );
			template = template.replace(/dd/g, (day > 9 ? day : '0' + day) );
			template = template.replace(/HH/g, (hour > 9 ? hour : '0' + hour) );
			template = template.replace(/mm/g, (minute > 9 ? minute : '0' + minute) );
			template = template.replace(/ss/g, (second > 9 ? second : '0' + second) );
			
			return template;
		}
	};
	
	//	异步请求方法	
	var axios = {
		
		query: function(data){
			
	        var params = [];
	        
        	data = data || {};
        	data['av'] = '3.0.0';
        	data['cv'] = '2.0.0';
        	data['client'] = (client.android ? 'jd-android' : ( client.iOS ? 'jd-ios' : 'jd-other' ));
	        
	        for(var key in data){
	            params.push(key + '=' + encodeURIComponent(data[key]));
	        }
	        return params.join('&');
		},
		
		get: function(url, data, callback){
			
            return Axios.get(url, {
            		params: axios.query(data) 
            	}).then(function(response){
            		
            		if (response.status == 200){
            			callback.call(this, response.data || {});
            		}else {
            			alert('网络请求错误' + response);	
            		}
            	}.bind(this)).catch(function (error) {
            		
            		alert('网络请求错误' + error);
            	});
		},
		
		post: function(url, data, callback){
			
            return Axios.post(url, axios.query(data),{
                	headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            	}).then(function(response){
            		
            		if (response.status == 200){
            			callback.call(this, response.data || {});
            		}else {
            			alert('网络请求错误' + response);	
            		}
            	}.bind(this)).catch(function (error) {
                
                	alert('网络请求错误' + error);
            	});
		}
	};
	
	return {
		
		Client: client,
		Axios: axios,
		Date: date,
		
		//	从一个字符串中获取时间日期
		dateFromString: function(date){
			
			var dates = date.split('-');
			if(dates.length==3){
				return new Date(parseInt(dates[0], 10), parseInt(dates[1], 10), parseInt(dates[2], 10));
			}
			return new Date();
		},
		
		//	从一个时间戳获取时间日期
		dateFromTicks: function(ticks){
			
			return new Date(ticks); 
		}, 
		
		//	格式化时间日期值
		dateFormat: function(date, template){
			
			date = date || new Date();
			
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours() ;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			
			template = template.replace(/yyyy/g, year);
			template = template.replace(/MM/g, (month > 9 ? month : '0' + month) );
			template = template.replace(/dd/g, (day > 9 ? day : '0' + day) );
			template = template.replace(/HH/g, (hour > 9 ? hour : '0' + hour) );
			template = template.replace(/mm/g, (minute > 9 ? minute : '0' + minute) );
			template = template.replace(/ss/g, (second > 9 ? second : '0' + second) );
			
			return template;
		}
	};
})();

export default utils;
