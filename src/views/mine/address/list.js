'use strict';

import Toast from "@/directives/toast";
import Store from "@/directives/store";
import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'address',
        mounted: function(){

            var vm = this;
            
            this.itemLoad();
        },
        data: function(){
            
            return {
                addressItems : []
            };
        },
        methods: {
            itemLoad: function(){
              
                var vm = this;
	                
	        	API.Mine.address(function(data){
	        		
	        		vm.addressItems = data;
	        	});
            },
            itemEdit: function(e, address, index){
            	
            	Store.Mine.addressCurrent = address || {};
            	Store.Mine.addressCurrent.isDefault = (index == 0 ? 1 : 0);
                this.$router.push( '/mine/address/edit' );
            },
            itemDelete: function(e, address){
            	
                var vm = this;
                
                API.Mine.addressDelete({
                    aid : address.addressId
                },function(data){
                    
                    if(data.code == 0){
        				Store.Mine.address = null;
                        Toast.show('删除地址成功');
                        vm.itemLoad();
                    }else {
                        Toast.show(data.msg);
                    }
                });
            }
        }
    }
})();

export default _default;