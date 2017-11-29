'use strict';

import API from "@/services/api";

var _default = (function(){

    return {
        name: 'details',
        mounted: function(){
        	
            var vm = this;
            
            API.Mine.orderDetail({
            	orderId : this.$route.query.order_id
            }, function(data){
            	
            	vm.orderInfo = data.data;
            });
        },
        data: function(){
            
            return {
                orderInfo : [],
            };
        },
        methods: {
            cellHref: function( e, url ){
        
                this.$router.push( url );
            }
        }
    }
})();

export default _default;