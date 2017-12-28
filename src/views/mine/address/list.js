'use strict';

import Toast from "@/directives/toast";
import Store from "@/directives/store";
import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'address',
        mounted: function(){

            var vm = this;
            vm.loadingstate = true;
            
            this.itemLoad();
        },
        data: function(){
            
            return {
                loadingstate: true,
                addressItems : []
            };
        },
        methods: {
            itemLoad: function(){
              
                var vm = this;
	                
	        	API.Mine.address(function(data){
	        		
	        		vm.addressItems = data;
	        		vm.loadingstate = false;
	        	});
            },
            itemEdit: function(e, address, index){
            	
            	Store.Mine.addressCurrent = address || {};
            	Store.Mine.addressCurrent.isDefault = (index == 0 ? 1 : 0);
                this.$router.push( '/mine/address/edit' );
                _hmt.push(["_trackEvent", "link", "click", "我的-地址列表-编辑"]);
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
                _hmt.push(["_trackEvent", "link", "click", "我的-地址列表-删除"]);
            }
        }
    }
})();

export default _default;