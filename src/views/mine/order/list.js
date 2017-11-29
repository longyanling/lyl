'use strict';

import Utils from '@/directives/utils';
import Toast from '@/directives/toast';
import API from "@/services/api";

var _default = (function(){
	    
    return {
        name: 'orders',
        mounted: function(){
        	
        	var vm = this;
        	
        	API.Mine.orders(function(data){
        		
        		var orders = (data.data || {}).data || [];
        		for (var i = 0; i < orders.length;i++){
        			
        			switch(orders[i].status){
        				case 0:
        				case 1:
        					vm.orderItems[1].push(orders[i]);
        					break;
        				case 2:
        				case 3:
        					vm.orderItems[2].push(orders[i]);
        					break;
        				case 4:
        				case 5:
        					vm.orderItems[3].push(orders[i]);
        					break;
        				case 11:
        				case 12:
        				case 13:
        					vm.orderItems[4].push(orders[i]);
        					break;
        			}
        			if (i==0){
        				orders[i].createTime = new Date().getTime() - 900000;
        			}
        			orders[i].lastSeconds = 1800 - Math.floor((new Date().getTime() - new Date(orders[i].createTime).getTime()) / 1000);
	        		if (orders[i].lastSeconds > 0){
	        			vm.startClock(orders[i]);
	        		}
        			vm.orderItems[0].push(orders[i]);
        		}
        	});
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
            		vm.$forceUpdate()
            	}, 1000);
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