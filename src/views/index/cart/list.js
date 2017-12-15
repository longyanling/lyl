'use strict';

import Utils from '@/directives/utils';
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import API from "@/services/api";

var _default = (function() {

    var toyClear = function(vm, tids) {
        
        API.Index.cartClear({
                tids: tids
            },
            function(data) {

                if(data.code == 0) {
                    vm.data = data.data;
                    vm.toyItems = data.data.cart || [];
                    for(var i = 0; i < vm.toyItems.length; i++) {
                        vm.toyItems[i].selected = ( Utils.Array.indexOf(vm.toySelectedIds, vm.toyItems[i].toyId) > -1 );
                    }
                    toyRecount(vm);
                } else {
                    Toast.show(data.msg);
                }
            }
        );
    };

    var toyRecount = function(vm) {

        vm.toySelectedIds = [];
        vm.toyTotalPrice = 0;
        for(var i = 0; i < vm.toyItems.length; i++) {
            if(vm.toyItems[i].selected){
                vm.toyTotalPrice += parseFloat(vm.toyItems[i].rentMoney * 1000) / 1000;
            }
            vm.toyItems[i].selected && vm.toySelectedIds.push(vm.toyItems[i].toyId);
        };
        vm.toySelectedAll = (vm.toySelectedIds.length == vm.toyItems.length)
    };

    return {
        name: 'index-cart',
        mounted: function() {
            
            var vm = this;
            
            vm.cartLoading = true;
            
            API.Index.cartList({

                },
                function(data) {
                    vm.data = data;
                    var toys = data.cart || [];
                    for( var i = 0; i < toys.length; i++){
                        if(toys[i].stockNum > 0){
                            vm.toyItems.push(toys[i]);
                        }else {
                            vm.stockItems.push(toys[i]);
                        }
                    }
                    for(var i = 0; i < vm.toyItems.length; i++) {
                        vm.toyItems[i].selected = vm.toyItems[i].stockNum <= 0 ? false : true;
                    };
                    toyRecount(vm);
                    vm.cartLoading = false;
                }
            );
            setTimeout(function() {

                vm.animateContainerClass = 'fadeIn';
            }, 1);
        },
        props: [
            'backUrl'
        ],
        data: function() {

            return {
                cartLoading: true,
                data: [],
                toyItems: [],
                toyTotalPrice: 0,
                stockItems : [],
                toySelectedAll: true,
                toySelectedIds: [],
                animateContainerClass: '',
            };
        },
        methods: {
            deactive: function(e) {

                if(e.target.id == 'index-cart') {
                    this.$router.back( -1 );
                }
            },
            selectAll: function() {
                
                var vm = this;
                vm.toySelectedAll = !vm.toySelectedAll;
                for(var i = 0; i < vm.toyItems.length; i++) {
                    vm.toyItems[i].selected = vm.toySelectedAll;
                };
                toyRecount(vm);
            },
            selectItem: function(e, item) {

                for(var i = 0; i < this.toyItems.length; i++) {
                    if(this.toyItems[i].toyId == item.toyId) {
                        this.toyItems[i].selected = !this.toyItems[i].selected;
                    }
                };
                toyRecount(this);
            },
            goToyDetail: function(e, toyId) {

                this.$router.push('/index/detail?toyid=' + toyId);
            },
            deleteItem: function(e, toyId) {

                var vm = this;
                vm.data = [];
                toyClear(this, String(toyId));
            },
            clear: function() {

                var vm = this;
                vm.data = [];
                var tid = [];
                for(var i = 0; i< vm.toyItems.length; i++){
                    tid.push(vm.toyItems[i].toyId);
                };
                toyClear(this, tid.join(';'));
            },
            submit: function() {

                if(this.toySelectedIds.length > 0) {
                    Store.Index.orderToys = [];
                    for(var i = 0; i < this.toyItems.length; i++) {
                        this.toyItems[i].selected && Store.Index.orderToys.push(this.toyItems[i]);
                    }
                    this.$router.push('/index/confirm');
                } else {
                    Toast.show('您尚未选择玩具');
                }
            }
        }
    }
})();

export default _default;