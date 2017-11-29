'use strict';

import API from "@/services/api";

var _default = (function(){
    
    return {
        name: 'return',
        mounted: function(){
        	
        	this.express = this.$route.query.express || '圆通快递';
        },
        data: function(){
            
            return {
                express: '圆通快递'
            };
        },
        methods: {
            goExpress: function(e){

                this.$router.push( '/mine/order/express' );
            }
        }
    }
})();

export default _default;