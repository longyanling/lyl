'use strict';

import Toast from '@/directives/toast';
import Store from '@/directives/store';
import API from "@/services/api";


var _default = (function(){
     
    return {
        name: 'address',
        mounted: function(){
        
            this.itemLoad();
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                addressItems : [ ],
            };
        },
        methods: {
            deactive: function(e){
                
                if (e.target.id == 'address'){
                    this.$router.back( -1 );   
                }
            },
            itemLoad: function(){
              
                var vm = this;
                
                API.Mine.address(function(data){
                    
                    vm.addressItems = data;
                });  
            },
            itemSelect : function(e, address){
                
                this.$emit('resetAddressId', address);
                this.$router.back( -1 );
            },
            itemEdit: function( e, item ){
                
                Store.Mine.addressCurrent = item; 
                this.$router.push( '/index/confirm/address/edit' );
            },
            itemDelete : function (e, addressId) {
                
                var vm = this;
                
                API.Mine.addressDelete({
                    aid : addressId
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