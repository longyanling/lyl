'use strict';

import Toast from "@/directives/toast";
import Store from "@/directives/store";
import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'location',
        mounted: function(){
        	
            var vm = this;
    		this.placeSearch = new AMap.PlaceSearch({
        		pageSize: 24,
        		pageIndex: 1
    		});
			vm.address = this.$route.query.address || '';
    		vm.addressOld = vm.address;
    		vm.addressOld && vm.placeSearch.search(vm.address, vm.submitCallback);
        },
        data: function(){
            
            return {
            	placeSearch: null,
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
        			this.placeSearch.search(this.address, this.submitCallback);
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
                    	Store.Mine.addressCurrent.addressDetail = address.name;
                    	Store.Mine.addressCurrent.gdTitle = '';
		            	Store.Mine.addressCurrent.gdBusinessArea = '';
		            	Store.Mine.addressCurrent.gdAdCode = poi.adcode;
		            	Store.Mine.addressCurrent.gdAdName = poi.district;
		            	Store.Mine.addressCurrent.gdCityCode = poi.citycode;
		            	Store.Mine.addressCurrent.gdCityName = poi.city;
		            	Store.Mine.addressCurrent.gdProvinceCode = poi.city;
		            	Store.Mine.addressCurrent.gdProvinceName = poi.province;
                    
                    	vm.$router.push('/mine/address/edit');
		            } else {
        				Toast.show('地址搜索失败:' + status);
		            }
		        });
        	}
        }
    }
})();

export default _default;