'use strict';

import Toast from '@/directives/toast';
import Store from '@/directives/store';
import API from "@/services/api";

var _default = (function(){
     
    var toyClear = function(vm, tids){
        
        API.Index.cartClear(
            {
                tids : tids
            },
            function (data) {
                
                if (data.code == 0) {
                    vm.data = data.data;
                    vm.toyItems = data.data.cart || [];
                    vm.toyIdItems = [];
                    for ( var i = 0; i < vm.toyItems.length; i++){
                        vm.toyIdItems.push(vm.toyItems[i].toyId);
                    }
                } else {
                    Toast.show(data.msg);
                }
            }
        );  
        console.log(tids);
    };
     
    return {
        name: 'index-cart',
        mounted: function(){
            
            var vm = this;
            
            API.Index.cartList(
                {
                    
                },
                function (data) {
                    
                    if (data.code == 0) {
                        vm.data = data.data;
                        vm.toyItems = data.data.cart || [];
                        for ( var i = 0; i < vm.toyItems.length; i++){
                            vm.toyIdItems.push(vm.toyItems[i].toyId);
                        }
                    } else {
                        Toast.show(data.msg);
                    }
                }
            );
            setTimeout(function(){
                
                vm.animateContainerClass = 'fadeIn';
            }, 1);
        },
        data: function(){
           
            return {
                data: [],
                toyItems: [],
                toyIdItems: [],
                animateContainerClass: ''
            };
        },
        methods: {
            deactive: function(e){
                
                if (e.target.id == 'index-cart'){
                    this.$router.push( '/index' );   
                }
            },
            goToyDetail: function(e, toyId){
                
                this.$router.push('/index/detail?toyid=' + toyId);
            },
            deleteItem: function(e, toyId){
                
                var vm = this;
                vm.data = [];
                toyClear(this, String(toyId));
            },
            clear: function(){
                
                var vm = this;
                vm.data = {};
                
                toyClear(this, vm.tidsItem.join(';'));
            },
            submit : function() {
                
                Store.Index.orderToys = [];
                for ( var i = 0; i < this.toyItems.length; i++){
                    Store.Index.orderToys.push(this.toyItems[i]);
                }
                //  Store.Mine.carts = this.toyItems;
                this.$router.push('/index/confirm');
            }
        }
    }
})();

export default _default;