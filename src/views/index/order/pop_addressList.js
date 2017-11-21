'use strict';
import Toast from '@/directives/toast';
import mineAPI from "@/services/mine-service";


var _default = (function(){
     
    return {
        name: 'order-addressList',
        mounted: function(){
            var that = this;
        
            mineAPI.addressList(
                {
                    
                },
                function (data) {
                    
                    if (data.code == 0) {
                        that.addressItem = data.data;
                         
                    } else {
                        Toast.show(data.msg);
                    }
                })
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                addressItem : [ ],
            };
        },
        methods: {
            deleteAddress : function () {
                alert('亲确定要删除该地址吗？')
            },
            cellHref: function( e, url ){
        
                this.$router.push( url );
            }
        }
    }
})();

export default _default;