'use strict';

import Store from '@/directives/store';
import Toast from '@/directives/toast';
import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'addressEdit',
        mounted: function(){
            
            var vm = this;
            vm.addressInfo =Store.Mine.addressCurrent || {}; 
            //  var address = Store.Mine.addressCurrent || {};
            vm.addressConsignee = (vm.addressInfo.addressConsignee || '');
            vm.consigneeSex = (vm.addressInfo.consigneeSex == 1 ? true : false);
            vm.sexIndex = vm.consigneeSex ? 1 : 0;
            vm.consigneePhone = vm.addressInfo.consigneePhone || ''; 
            vm.gdProvinceName = vm.addressInfo.gdProvinceName || '';
            vm.gdCityName = vm.addressInfo.gdCityName || '';
            vm.gdAdName = vm.addressInfo.gdAdName || '';
            vm.gdAdCode = vm.addressInfo.gdAdCode || '';
            vm.gdBusinessArea = vm.addressInfo.gdBusinessArea || '';
            vm.gdTitle = vm.addressInfo.gdTitle || '';
            vm.addressAll = vm.gdProvinceName + vm.gdCityName + vm.gdAdName + vm.gdBusinessArea + vm.gdTitle; 
            vm.addressDetail = vm.addressInfo.addressDetail || '';
        },
        data: function(){

            return {
                addressInfo: null,
                addressConsignee : null,
                consigneeSex : null,
                consigneePhone : null,
                gdProvinceName : null,
                gdCityName : null,
                gdAdName : null,
                gdBusinessArea : null,
                gdTitle : null,
                addressAll : null,
                addressDetail : null,
                sexIndex : null,
                isDefaultState : false,
                isDefault : 0
            };
        },
        methods: {
            deactive: function(e){
                
                if (e.target.id == 'addressAdd'){
                    this.$router.push( '/index/confirm' );   
                }
            },
            sexSelect : function( e, state){
            
                this.consigneeSex = state;
                this.sexIndex = state ? 1 : 0;
            },
            isDefaultSelect : function(){
                
                this.isDefaultState = !this.isDefaultState;
                this.isDefault = this.isDefaultState ? 1 : 0;
            },
            itemSave : function(){
                
                var vm = this;
                
                var args = {
                    addressConsignee : vm.addressConsignee,
                    consigneePhone : Number(vm.consigneePhone),
                    consigneeSex : vm.sexIndex,
                    gdProvinceName : vm.gdProvinceName,
                    gdProvinceCode : vm.gdProvinceCode,
                    gdCityName : vm.gdCityName,
                    gdCityCode : vm.gdCityCode,
                    gdAdName : vm.gdAdName,
                    gdAdCode : vm.gdAdCode,
                    gdBusinessArea : vm.gdBusinessArea,
                    gdLatitude : vm.gdLatitude,
                    gdLongitude : vm.gdLongitude,
                    gdId : vm.gdId,
                    gdTitle : vm.gdTitle,
                    addressDetail : vm.addressDetail,
                    
                };
                
                if(vm.address){
                    args.addressId = vm.addressInfo.addressId;
                    
                    API.Mine.addressUpdata(
                        {
                            addressJson : JSON.stringify(args),
                            isDefault : vm.isDefault
                        },
                        function(data) {
                            if(data.code == 0){
                                vm.goToAddress();
                            }else {
                                Toast.show(data.msg);
                            }
                        }
                    )
                } else {
                    API.Mine.addressInsert(
                        {
                            addressJson : JSON.stringify(args),
                            isDefault : vm.isDefault
                        },
                        function(data) {
                            if(data.code == 0){
                                vm.goToAddress();
                            }else {
                                Toast.show(data.msg);
                            }
                        }
                    )
                };
                
            },
            
            goToAddress: function(){
        
                this.$router.push( '/index/confirm/address' );
            }
        }
    }
})();

export default _default;