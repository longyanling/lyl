'use strict';
import mineAPI from "@/services/mine-service";

var _default = (function(){
    
    return {
        name: 'mine-addressList',
        mounted: function(){
            var that = this;
        
            mineAPI.addressList(
                {
                    
                },
                function (data) {
                    
                    if (data.code == 0) {
                        that.addressItem = data.data;
                         
                    } else {
                        console.log(results);
                    }
                })
            
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                addressItem : [],
            };
        },
        methods: {
            goToAddressAdd: function(){
        
                this.$router.push( '/mine/addressAdd' );
            }
        }
    }
})();

export default _default;