'use strict';
import mineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'order-details',
        mounted: function(){
            var that = this;
            
            mineAPI.orderDetail( 
                {
                   orderId : 88424999173 
                },
                function (data) {

                    if (data.code == 0) {
                        that.detailsItem = data.data;
                        
                    } else {
                        console.log(results);
                    }
                })
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                detailsItem : [],
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