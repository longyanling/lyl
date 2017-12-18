'use strict';

import API from "@/services/api";

var _default = (function(){

    return {
        name: 'details',
        mounted: function(){
        	
            var vm = this;
            
            vm.loadingstate = true;
            vm.orderIdItem = this.$route.query.order_id;
            
            API.Mine.orderDetail({
            	orderId : vm.orderIdItem
            }, function(data){
            	
            	vm.orderInfo = data.data;
            	vm.loadingstate = false;
            });
        },
        data: function(){
            
            return {
                loadingstate: true,
                orderInfo : [],
                orderIdItem :null
            };
        },
        methods: {
            payment : function(e, toys) {

                Store.Index.orderToys = [];
                Store.Index.orderToys = toys;
                this.$router.push('/index/confirm');
            },
            orderCancel : function(e, orderId){
                var vm = this;
                vm.orderInfo = [];
                API.Mine.cancel(
                    {
                        orderId : orderId
                    },function(data){
                        if(data.code == 0){
                            API.Mine.orderDetail({
                                orderId : vm.orderIdItem
                            }, function(data){
                                
                                vm.orderInfo = data.data;
                            });
                        }else {
                            Toast.show(data.msg);
                        }
                    }
                )
            },
            orderDelete: function(e, orderId){
                var vm = this;
                vm.orderInfo = [];
                API.Mine.delete(
                    {
                        orderId : orderId
                    },function(data){
                        if(data.code == 0){
                            API.Mine.orderDetail({
                                orderId : vm.orderIdItem
                            }, function(data){
                                
                                vm.orderInfo = data.data;
                            });
                        }else {
                            Toast.show(data.msg);
                        }
                    }
                )
            },
            goIndex : function () {
                
                this.$router.push('/index');
            },
            goLogistics : function (e, orderId){
                
                this.$router.push('/mine/order/logistics?order_id=' + orderId);
            }
        }
    }
})();

export default _default;