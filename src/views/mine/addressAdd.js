'use strict';
import mineAPI from "@/services/mine-service";

var _default = (function(){
    
    return {
        name: 'mine-addressAdd',
        mounted: function(){

        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                
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