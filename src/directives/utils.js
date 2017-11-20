var utils = (function(){
	
	return {
		//	从一个字符串中获取时间日期
		dateFromString: function( date ){
			
			var dates = date.split('-');
			if(dates.length==3){
				return new Date(parseInt(dates[0], 10), parseInt(dates[1], 10), parseInt(dates[2], 10));
			}
			return new Date();
		},
		//	从一个时间戳获取时间日期
		dateFromTicks: function( ticks ){
			
			return new Date(ticks); 
		}, 
		//	格式化时间日期值
		dateFormat: function( date, template ){
			
			date = date || new Date();
			
			var year = date.getFullYear();
			var month = date.getMonth();
			var day = date.getDate();
			var hour = date.getHours();
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
