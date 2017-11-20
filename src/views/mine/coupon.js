'use strict';

import Toast from '@/directives/toast'
import MineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'mine-coupon',
        mounted: function(){
	        
	        MineAPI.coupon(function( data ){
	        	
	        	if (data.code == 0){
	        		
	        	} else {
	        		Toast.show(data.msg);
	        	}
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