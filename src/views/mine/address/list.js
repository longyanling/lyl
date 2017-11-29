'use strict';

import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'address',
        mounted: function(){
        	
            var vm = this;
        
        	API.Mine.address(function(data){
        		
        		vm.addressItems = data.data || {};
        	});
        },
        data: function(){
            
            return {
                addressItems : []
            };
        },
        methods: {
            goEdit: function(e, address){
            	
        	console.log(address);
                this.$router.push( '/mine/address/edit?address_id=' + address );
            }
        }
    }
})();

export default _default;