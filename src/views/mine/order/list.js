'use strict';
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
        			vm.orderItems[0].push(orders[i]);
        		}
        		console.log(vm.orderItems);
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
            publicRouting : function () {
                this.$router.push('/index');
            },
            navChange: function (e, index){

                this.tabIndex = index;
            },
            goToDetail: function (e, orderId){
            	
                this.$router.push('/mine/order/details');
            },
            goToLogistics : function (e, orderId){
            	
                this.$router.push('/mine/order/logistics');
            }
        },
        filters: {
        	clock: function(value){
        		
        		var timer;
        		var lastTicks = Math.floor((new Date().getTime() - new Date(value).getTime()) / 1000) ;
        		var seconds = lastTicks % 60;
        		var minutes = Math.floor(lastTicks / 60);
        		if (minutes < 30){
        			timer = setInterval(function(){
        				
        			}, 1000);
        		}
        		return minutes + '分' + seconds + '秒';
        	}
        }
    }
})();

export default _default;