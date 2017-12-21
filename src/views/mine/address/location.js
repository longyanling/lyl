'use strict';

import Toast from "@/directives/toast";
import Store from "@/directives/store";
import API from "@/services/api";

var _default = (function(){
    
    var placeSearch = new AMap.PlaceSearch({
        pageSize: 24,
        pageIndex: 1
    });
    
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
                vm.address = data.formattedAddress;
                vm.addressOld = vm.address;
                vm.addressOld && placeSearch.search(vm.address, vm.submitCallback);
            });
        });
    };
    return {
        name: 'location',
        mounted: function(){
        	
            var vm = this;
            
            if(vm.$route.query.address){
                vm.address = vm.$route.query.address;
                vm.addressOld = vm.address;
                vm.addressOld && placeSearch.search(vm.address, vm.submitCallback);
            }else {
                amapLocation(vm);
            };
    		
    		
        },
        data: function(){
            
            return {
            	address: null,
            	addressOld: null,
            	poiItems: []
            };
        },
        methods: {
        	submitCallback: function(status, result){
        	
        		if (status === 'complete' && result.info === 'OK'){
        			this.poiItems =  (result.poiList || {}).pois || [];
        		} else {
        			Toast.show('地址搜索失败:' + status);
        		}
        	},
        	submit: function(){
        		
        		if (this.address != this.addressOld){
        			placeSearch.search(this.address, this.submitCallback);
        			this.addressOld = this.address;
        		}
			    return false;
        	},
        	select: function(e, address){
        		
        		var vm = this;
        		var geocoder = new AMap.Geocoder({ });

		        geocoder.getAddress(address.location, function(status, result) {
		        	
		            if (status === 'complete' && result.info === 'OK') {
		            	
		            	var poi = (result.regeocode || {}).addressComponent || {};

		            	Store.Mine.addressCurrent = Store.Mine.addressCurrent || {};
		            	Store.Mine.addressCurrent.gdId = address.id;
		            	Store.Mine.addressCurrent.gdLatitude = address.location.lat;
		            	Store.Mine.addressCurrent.gdLongitude = address.location.lng;
                    	Store.Mine.addressCurrent.addressDetail = '';
                    	Store.Mine.addressCurrent.gdTitle = address.name;
		            	Store.Mine.addressCurrent.gdBusinessArea = '';
		            	Store.Mine.addressCurrent.gdAdCode = poi.adcode;
		            	Store.Mine.addressCurrent.gdAdName = poi.district;
		            	Store.Mine.addressCurrent.gdCityCode = poi.citycode;
		            	Store.Mine.addressCurrent.gdCityName = poi.city;
		            	Store.Mine.addressCurrent.gdProvinceCode = poi.city;
		            	Store.Mine.addressCurrent.gdProvinceName = poi.province;
                    
                    	vm.$router.back(-1);
		            } else {
        				Toast.show('地址搜索失败:' + status);
		            }
		        });
        	}
        }
    }
})();

export default _default;