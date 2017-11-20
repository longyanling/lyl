'use strict';
import mineAPI from "@/services/mine-service";

var _default = (function(){
    var navs = [
        {
            'text': '全部', 
        },
        {
            'text': '待付款',
        },
        {
            'text': '待收货',
        },          
        {
            'text': '待归还',
        },
        {
            'text': '已完成',
        }
    ];
    return {
        name: 'order-return',
        mounted: function(){
            var that = this;
        
            
            mineAPI.orderList(
                { 
                    av : '3.0.0',
                    client : 'alipay-ios',
                    cv : '2.0.0',
                    uid : 73486241289, 
                }, 
                function( data ){
                    
                    if (data.code == 0) {
                        var orders = data.data.data;
                        var result = new Array();
                        orders.forEach(function(order) {
                            if (order.orderCategory === 0 && order.orderType === 1) {
                                if (order.toys.length <= 2) {
                                    order.displayToys = order.toys;
                                } else {
                                    order.displayToys = new Array();
                                    order.displayToys.push(order.toys[0]);
                                    order.displayToys.push(order.toys[1]);
                                }
                                result.push(order);
                            }
                        });
                        console.log(orders)
                        //待付款
                        var paymentsItem = [];
                        //待收货
                        var receiptsItem = [];
                        //待归还
                        var returnsItem  = [];
                        //已完成
                        var completesItem = [];
                        result.forEach(function(order){
                            if(order.status == 0){
                                paymentsItem.push(order);
                            };
                            if(order.status == 2 || order.status == 3){
                                receiptsItem.push(order);
                            };
                            if(order.status == 4 || order.status == 5){
                                returnsItem.push(order);
                            };
                            if(order.status == 11 || order.status == 12 || order.status == 13){
                                completesItem.push(order);
                            }
                        });
                        that.orderAllItem = [ orders, paymentsItem, receiptsItem, returnsItem, completesItem];
                         
                    } else {
                        Toast.show(data.msg);
                    }
                });
        },
        destoryed: function(){

        },
        data: function(){

            return {
                navItems : navs,
                //全部分类的集合
                orderAllItem : [ ],
                tabIndex : 0,
            };
        },
        methods: {
            publicRouting : function () {
                this.$router.push('/index');
            },
            navChange: function (e, index){

                this.tabIndex = index;
            },
            goToDetail: function (e, orderId){
                console.log(orderId)
                this.$router.push('/mine/order/details');
            },
            goToLogistics : function (e, orderId){
                console.log(orderId)
                this.$router.push('/mine/order/logistics');
            },
            
        }
    }
})();

export default _default;