'use strict';

import Sortor from "@/directives/sortor";
import Store from "@/directives/store";
import Toast from '@/directives/toast';
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
	        	var citycode = data.addressComponent.citycode;
				vm.cityInfo = data.addressComponent.city ||  data.addressComponent.province || '定位失败';
				vm.cityLocation = '定位成功';
				API.Index.cityCode({
                    cityCode: citycode
                    },function (data) {
                    if (data.code == 0) {
                        Toast.show('定位成功');
                        Store.Index.cityNameSet(vm.cityInfo);
                        vm.$router.back(-1);
                    } else {
                        Toast.show(data.msg);
                    }
                });
	        });
	    });
	};
	
    return {
        name: 'Location',
        mounted: function(){
        	
            var vm = this;
            vm.loadingShow = true;
            vm.cityInfo = Store.Index.cityName ? Store.Index.cityName : '北京';
            
            API.Index.location({
                
            },function (data) {
            	
                if (data.code == 0) {
                    vm.cityHotItems = data.data.hotCities;       
                    vm.cityAllItems = Sortor.pinyin(data.data.cities);
                    vm.loadingShow = false;
                } else {
                    Toast.show(data.msg);
                }
            });
        },
        data: function(){

            return {
                loadingShow : true,
            	cityInfo: null,
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
            itemSelect : function(e, item){
                
                var vm = this;
                
                API.Index.cityCode({
                    cityCode: item.cityCode
                },function (data) {
                    if (data.code == 0) {
                            
                        Store.Index.cityNameSet(item.cityName);
                        vm.$router.back(-1);
                    } else {
                        Toast.show(data.msg);
                    }
                });
            }
            
        }
    }
})();

export default _default;