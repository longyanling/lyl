'use strict';

import Sortor from "@/directives/sortor";
import API from "@/services/api";

var _default = (function(){
	
	var map, geolocation;
	var amapLocation = function(vm){
		
		map = new AMap.Map('locationAMap', {
			resizeEnable: false
		});
	    map.plugin('AMap.Geolocation', function() {
	    	
	        geolocation = new AMap.Geolocation({
	            timeout: 10000,
	            zoomToAccuracy: true,
	            enableHighAccuracy: true,
	            buttonOffset: new AMap.Pixel(10, 20),
	            buttonPosition:'RB'
	        });
	        map.addControl(geolocation);
	        geolocation.getCurrentPosition();
	        AMap.event.addListener(geolocation, 'complete', function(data){
	        	
				vm.cityInfo = data.addressComponent.city ||  data.addressComponent.province || '定位失败';
				vm.cityLocation = '定位成功';
	        });
	    });
	};
	
    return {
        name: 'Location',
        mounted: function(){
        	
            var vm = this;
            
            API.Index.location({
                
            },function (data) {
            	
                if (data.code == 0) {
                    vm.cityHotItems = data.data.hotCities;       
                    vm.cityAllItems = Sortor.pinyin(data.data.cities);
                } else {
                    console.log(data.msg);
                }
            });
        },
        data: function(){

            return {
            	cityInfo: '定位',
            	cityLocation: '获取定位',
                cityHotItems : null,
                cityAllItems : null,
            };
        },
        methods: {
        	
        	getLocaqtion: function(e){
        		
        		this.cityLocation = '正在定位..';
        		amapLocation(this);
        	},
        	selectLocation: function(){
        		
                this.$router.push('/index/location/amap');
        	}, 
            goHome : function() {
            	
                this.$router.push('/index');
            }
        }
    }
})();

export default _default;