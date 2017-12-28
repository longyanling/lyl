'use strict';

import API from "@/services/api";
import Store from '@/directives/store';

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
            payment : function(e, orderId) {
                var payOrderId = orderId;
                API.Index.payCheck(
                    {
                        orderId : payOrderId,
                    },
                    function(data) {
                        if(data.code == 0){
                            var fromPayment = document.getElementById('paymentJd');
                            var seqId = document.getElementById('seqId');
                            var orderId = document.getElementById('orderId');
                            seqId.value = data.data.seqId;
                            orderId.value = payOrderId;
                            fromPayment.submit();
                        }else {
                            Toast.show(data.msg);
                        }
                    }
                );
                _hmt.push(["_trackEvent", "link", "click", "我的-订单详情-立即付款"]);
            },
            placeOrder : function(e, toys) {

                Store.Index.orderToys = [];
                Store.Index.orderToys = toys;
                this.$router.push('/index/confirm');
                _hmt.push(["_trackEvent", "link", "click", "我的-订单详情-再次下单"]);
            },
            orderCancel : function(e, orderId){
                var vm = this;
                vm.orderInfo = [];
                vm.$router.back(-1);
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
                );
                _hmt.push(["_trackEvent", "link", "click", "我的-订单详情-取消订单"]);
            },
            orderDelete: function(e, orderId){
                var vm = this;
                vm.orderInfo = [];
                vm.$router.back(-1);
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
                );
                _hmt.push(["_trackEvent", "link", "click", "我的-订单详情-删除订单"]);
            },
            goIndex : function () {
                
                this.$router.push('/index');
                _hmt.push(["_trackEvent", "link", "click", "我的-订单详情-再租几件"]);
            },
            goLogistics : function (e, orderId){
                
                this.$router.push('/mine/order/logistics?order_id=' + orderId);
                _hmt.push(["_trackEvent", "link", "click", "我的-订单详情-查看物流"]);
            }
        }
    }
})();

export default _default;