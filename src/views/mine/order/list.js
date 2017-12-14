'use strict';

import Utils from '@/directives/utils';
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import API from "@/services/api";

var _default = (function(){
    
    var orderList = function(vm){
        API.Mine.orders(function(data){
                
            var orders = (data.data || {}).data || [];
            for (var i = 0; i < orders.length;i++){
                
                if(orders[i].status == 0){ vm.orderItems[1].push(orders[i]) };
                if(orders[i].status == 2 || orders[i].status == 3){ vm.orderItems[2].push(orders[i]) };
                if(orders[i].status == 4 || orders[i].status == 5){ vm.orderItems[3].push(orders[i]) };
                if(orders[i].status == 11 || orders[i].status == 12 || orders[i].status == 13){ vm.orderItems[4].push(orders[i]) };
                 
                orders[i].lastSeconds = 1800 - Math.floor((new Date().getTime() - new Date(orders[i].createTime).getTime()) / 1000);
                if (orders[i].lastSeconds > 0){
                    vm.startClock(orders[i]);
                }
                vm.orderItems[0].push(orders[i]);
            }
        })
    }
	
    return {
        name: 'orders',
        mounted: function(){
        	
        	var vm = this;
            orderList(vm);
        },
        data: function(){

            return {
            	statusIndex: 0,
            	statusItems: [ '全部','待付款','待收货','待归还','已完成'],
            	orderItems: [[],[],[],[],[]]
            };
        },
        methods: {
            statusChange: function (e, index){

                this.statusIndex = index;
            },
            startClock: function(item){
            	
            	var vm = this;
            	
            	item.timer = setInterval(function(){
            	
            		item.lastSeconds -- ;
            		vm.$forceUpdate();
            	}, 1000);
            },
            payment : function(e, toys) {

                Store.Index.orderToys = [];
                Store.Index.orderToys = toys;
                this.$router.push('/index/confirm');
            },
            orderCancel : function(e, orderId){
                var vm = this;
                vm.orderItems = [[],[],[],[],[]];
                API.Mine.cancel(
                    {
                        orderId : orderId
                    },function(data){
                        if(data.code == 0){

                            orderList(vm);
                        }else {
                            Toast.show(data.msg);
                        }
                    }
                )
            },
            orderDelete: function(e, orderId){
                var vm = this;
                vm.orderItems = [[],[],[],[],[]];
                API.Mine.delete(
                    {
                        orderId : orderId
                    },function(data){
                        if(data.code == 0){
                            orderList(vm);
                        }else {
                            Toast.show(data.msg);
                        }
                    }
                )
            },
            goIndex : function () {
            	
                this.$router.push('/index');
            },
            goDetails: function (e, orderId){
            	
                this.$router.push('/mine/order/details?order_id=' + orderId);
            },
            goLogistics : function (e, orderId){
            	
                this.$router.push('/mine/order/logistics?order_id=' + orderId);
            }
        },
        filters: {
        	clock: function(lastSeconds){
        		
        		if (lastSeconds > 0){
	        		return (Math.floor(lastSeconds / 60)) + '分' + (lastSeconds % 60) + '秒';	
        		} else {
        			return '已过期';
        		}
        		
        	}
        }
    }
})();

export default _default;