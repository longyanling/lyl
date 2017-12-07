'use strict';

import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'address',
        mounted: function(){
        	
            var vm = this;
        
        	API.Mine.address(function(data){
        		
        		vm.addressItems = data;
        	});
        },
        data: function(){
            
            return {
                addressItems : []
            };
        },
        methods: {
            goEdit: function(e, address){
            	
                this.$router.push( '/mine/address/edit?address_id=' + address );
            },
            itemDelete : function (e, addressId) {
                
                var vm = this;
                
                API.Mine.addressDelete({
                    aid : addressId
                },function(data){
                    
                    if(data.code == 0){
        
                        vm.itemLoad();
                        Toast.show('删除地址成功');
                    }else {
                        Toast.show(data.msg);
                    }
                });
            }
        }
    }
})();

export default _default;