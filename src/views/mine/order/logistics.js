'use strict';

import Utils from "@/directives/utils";
import API from "@/services/api";

var _default = (function(){

    return {
        name: 'logistics',
        mounted: function(){
        	
            var vm = this;
            
            API.Mine.logistics({
            	orderId : this.$route.query.order_id
            }, function(data){
            	
            	if (data.data && data.data.expressList){
            		for (var i = 0; i < data.data.expressList.length; i++){
            			if (data.data.expressList[i].expressType == 200 ){
            				vm.sendItems.push(data.data.expressList[i]);
            			} else {
            				vm.receiveItems.push(data.data.expressList[i]);
            			}
            		}
            	} 
            });
        },
        data: function(){
            
            return {
            	tabIndex: 1,
            	sendItems: [],
            	receiveItems: [],
            	expressMailIndex : 0,
            	expressReturnIndex : 0,
            };
        },
        methods: {
        	tabChange: function(e, index){
        		
        		this.tabIndex = index;
        	},
            goReturn: function(e){
        
                this.$router.push( '/mine/order/return' );
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