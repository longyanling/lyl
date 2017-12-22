'use strict';

import Utils from "@/directives/utils";
import API from "@/services/api";

var _default = (function(){

    return {
        name: 'logistics',
        mounted: function(){
        	
            var vm = this;
            vm.orderLoading = true;
            vm.orderId = this.$route.query.order_id
            
            API.Mine.logistics({
            	orderId : vm.orderId
            }, function(data){
            	
            	if (data.data && data.data.expressList){
            	    vm.orderStatus = data.data.status;
            		for (var i = 0; i < data.data.expressList.length; i++){
            			if (data.data.expressList[i].expressType == 100 ){
            				vm.sendItems.push(data.data.expressList[i]);
            			} else {
            				vm.receiveItems.push(data.data.expressList[i]);
            			}
            		}
            	}
            	vm.orderLoading = false;
            });
        },
        data: function(){
            
            return {
                orderLoading: true,
            	tabIndex: 0,
            	orderStatus : null,
            	sendItems: [],
            	receiveItems: [],
            	expressMailIndex : 0,
            	expressReturnIndex : 0,
            	orderId : null
            };
        },
        methods: {
        	tabChange: function(e, index){
        		
        		this.tabIndex = index;
        	},
            goReturn: function(e){
                
                if(this.orderStatus < 5) return ;
                this.$router.push( '/mine/order/return?order_id=' + this.orderId);
            }
        },
        filters: {
        	date: function(value){
        		
        		return Utils.Date.toString(Utils.Date.fromString(value), 'yyyy-MM-dd');
        	},
        	time: function(value){
        		
        		return Utils.Date.toString(Utils.Date.fromString(value), 'HH:mm:ss');
        	}
        }
    }
})();

export default _default;