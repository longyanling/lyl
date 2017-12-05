'use strict';
import Vue from 'vue';
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import API from "@/services/api";

var _default = (function(){
     
    return {
        name: 'index-cart',
        mounted: function(){
            var self = this;
            
            API.Index.cartList(
                {
                    
                },
                function (data) {
                    if (data.code == 0) {
                        self.shoppingItem = data.data;
                        self.cartToysItem = data.data.cart;
                        var toysQueue = data.data.cart;
                        toysQueue.forEach(function(toys){
                            self.tidsItem.push(toys.toyId);
                        })
                    } else {
                        Toast.show(data.msg);
                    }
                }
            );
           

        },
        destoryed: function(){

        },
        data: function(){
           
            return {
                shoppingItem : [],
                cartToysItem : [],
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
                var that = this;
                that.shoppingItem = [];
                var tids = String(toyId);
                API.Index.cartClear(
                    {
                        tids : tids
                    },
                    function (data) {
                        if (data.code == 0) {
                            that.shoppingItem = data.data;
                            that.cartToysItem = data.data.cart;
                            var toyCart = data.data.cart;
                            toyCart.forEach(function(toys){
                                that.tidsItem.push(toys.toyId);
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
                //在数据仓库中写入数据，在下单页面进行接收
                Store.data = this.cartToysItem;
                this.$router.push('/index/confirm');
            }
            
            
        }
    }
})();

export default _default;