'use strict';

import mineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'mine-coupon',
        mounted: function(){
	        
	        mineAPI.coupon(function( data ){
	        	
	        	console.log(data);
	        });
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                
            };
        },
        methods: {
            goToToy: function(){
        
                this.$router.push( "/toy" );
            }
        }
    }
})();

export default _default;