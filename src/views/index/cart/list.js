'use strict';
import Vue from 'vue';
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import API from "@/services/api";

var _default = (function(){
     
    return {
        name: 'index-cart',
        mounted: function(){
            var vm = this;
            
            API.Index.cartList(
                {
                    
                },
                function (data) {
                    if (data.code == 0) {
                        vm.cartToysItem = data.data.cart;
                        vm.shoppingItem = data.data;
                        var toysQueue = data.data.cart;
                        toysQueue.forEach(function(toys){
                            vm.tidsItem.push(toys.toyId);
                        })
                    } else {
                        Toast.show(data.msg);
                    }
                }
            );
           

        },
        data: function(){
           
            return {
                cartToysItem : [],
                shoppingItem : [],
                tidsItem : []       
            };
        },
        methods: {
            deactive: function(e){
                
                if (e.target.id == 'index-cart'){
                    this.$router.push( '/index' );   
                }
            },
            goToToyDetail : function(e, toyId){
                this.$router.push('/index/detail?toyid=' + toyId);
            },
            deleteAllToys : function() {
                this.shoppingItem = [];
                var tidsJson = this.tidsItem.join(';');
                API.Index.cartClear(
                    {
                        tids : tidsJson
                    },
                    function (data) {
                        if (data.code == 0) {
                            this.shoppingItem = data.data;
                            this.cartToysItem = data.data.cart;
                            var toysCart = data.data.cart;
                            toysCart.forEach(function(toys){
                                this.tidsItem.push(toys.toyId);
                            })
                        } else {
                            Toast.show(data.msg);
                        }
                    }
                )
                
            },
            deleteSoloToys : function(e, toyId) {
                var vm = this;
                vm.shoppingItem = [];
                var tids = String(toyId);
                API.Index.cartClear(
                    {
                        tids : tids
                    },
                    function (data) {
                        if (data.code == 0) {
                            vm.shoppingItem = data.data;
                            vm.cartToysItem = data.data.cart;
                            var toyCart = data.data.cart;
                            toyCart.forEach(function(toys){
                                vm.tidsItem.push(toys.toyId);
                            })
                        } else {
                            Toast.show(data.msg);
                        }
                    }
                )
            },
            goToToy : function() {
                
                this.$router.push('/index');
            },
            goToOrder : function() {

                Store.data = this.cartToysItem;
                this.$router.push('/index/confirm');
            }
            
            
        }
    }
})();

export default _default;