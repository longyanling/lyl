'use strict';

import Store from "@/directives/store";
import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'edit',
        mounted: function(){

			this.addressInfo = Store.Mine.addressCurrent || {};
			this.addressId = this.addressInfo.addressId || 0; 
			this.addressConsignee = this.addressInfo.addressConsignee || '';
			this.consigneeSex = this.addressInfo.consigneeSex || 0;
			this.consigneePhone = this.addressInfo.consigneePhone || '';
			this.addressPrefix = ( this.addressInfo.gdProvinceName || '' );
			this.addressPrefix += ( this.addressInfo.gdCityName == this.addressPrefix ? '' : (this.addressInfo.gdCityName || ''));
			this.addressPrefix += ( this.addressInfo.gdAdName || '' );
			this.addressPrefix += (this.addressInfo.gdBusinessArea || '');
			this.addressPrefix += (this.addressInfo.gdTitle || '');
			this.addressPrefix = this.addressPrefix.replace(/(^\s*)|(\s*$)/g, "");
			this.addressSub = (this.addressInfo.addressDetail || '');
			this.addressSub = this.addressSub.replace(/(^\s*)|(\s*$)/g, "");
			this.isDefault = this.addressInfo.isDefault ? 1 : 0;
			if (this.addressPrefix && this.addressSub.indexOf(this.addressPrefix) == 0){
				this.addressSub = this.addressSub.substring(this.addressPrefix.length, this.addressSub.length);
			}
        },
        data: function(){
            
            return {
            	addressId: 0,
            	addressInfo: {},
            	addressConsignee: null,
            	addressPrefix: null,
            	addressSub: null,
            	consigneeSex: 0,
            	consigneePhone: null,
            	isDefault: 0
            };
        },
        methods: {
        	sexCheck: function(e, sex){
        		
        		this.consigneeSex = sex;
        	},
        	defaultCheck: function(e){
        		
        		this.isDefault = this.isDefault ? 0 : 1;
        	},
        	getLocation: function(){
        		
        		Store.Mine.addressCurrent = Store.Mine.addressCurrent || {};
			 	Store.Mine.addressCurrent.addressConsignee = this.addressConsignee;
			 	Store.Mine.addressCurrent.consigneeSex = this.consigneeSex;
				Store.Mine.addressCurrent.consigneePhone = this.consigneePhone;
        		this.$router.push('/mine/address/location?address=' + this.addressPrefix);
        	},
            submit: function( e, url ){
            	
            	var vm = this;
                var args = {
                	addressId: vm.addressId,
                    addressConsignee : vm.addressConsignee || '',
                    consigneePhone : Number(vm.consigneePhone),
                    consigneeSex : vm.consigneeSex,
                    gdTitle : vm.addressInfo.gdTitle || '',
                    addressDetail : vm.addressSub || '',
                    gdLatitude : vm.addressInfo.gdLatitude,
                    gdLongitude : vm.addressInfo.gdLongitude,
                    gdId : vm.addressInfo.gdId,
                    gdBusinessArea : vm.addressInfo.gdBusinessArea || '',
                    gdAdCode : vm.addressInfo.gdAdCode || '',
                    gdAdName : vm.addressInfo.gdAdName || '',
                    gdCityCode : vm.addressInfo.gdCityCode || '',
                    gdCityName : vm.addressInfo.gdCityName  || '',
                    gdProvinceCode : vm.addressInfo.gdProvinceCode || '',
                    gdProvinceName : vm.addressInfo.gdProvinceName  || ''                    
                };
                
                if(vm.addressId){
                    API.Mine.addressUpdata(
                        {
                            addressJson : JSON.stringify(args),
                            isDefault : vm.isDefault
                        },
                        function(data) {
                        	
                            if (data.code == 0){
                            	Store.Mine.address = null;
                            	vm.$router.push('/mine/address');
                            } else {
                                Toast.show(data.msg);
                            }
                        }
                    )
                } else {
                	if (this.addressInfo.gdId){
	                    API.Mine.addressInsert(
	                        {
	                            addressJson : JSON.stringify(args),
	                            isDefault : vm.isDefault
	                        },
	                        function(data) {
	                        	
	                            if (data.code == 0){
	                            	Store.Mine.address = null; 
	                            	vm.$router.push('/mine/address');
	                            } else {
	                                Toast.show(data.msg);
	                            }
	                        }
	                    );
                    } else {
                    	Toast.show('请提供位置信息');
                    }
                };
            }
        }
    }
})();

export default _default;