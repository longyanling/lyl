'use strict';
import Toast from '@/directives/toast';
import Store from '@/directives/store';
import indexAPI from "@/services/index-service";


var _default = (function(){
     
    return {
        name: 'order-addressList',
        mounted: function(){
            var that = this;
        
            indexAPI.addressList(
                {
                    
                },
                function (data) {
                    if (data.code == 0) {
                        that.addressItem = data.data;
                        console.log(that.addressItem)
                         
                    } else {
                        Toast.show(data.msg);
                    }
                }
            )
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                addressItem : [ ],
            };
        },
        methods: {
            addressIdSubmit : function(e, address){
                this.$emit('resetAddressId', address);
                this.$router.push( '/index/confirm' );
            },
            deleteAddress : function (e, addressId) {
                var self = this;
                indexAPI.addressDelete(
                    {
                        aid : addressId
                    },
                    function(data) {
                        if(data.code == 0){
                            indexAPI.addressList(
                                {
                                    
                                },
                                function (data) {
                                    if (data.code == 0) {
                                        self.addressItem = data.data;
                                    } else {
                                        Toast.show(data.msg);
                                    }
                                })
                            Toast.show('删除地址成功');
                        }else {
                            Toast.show(data.msg);
                        }
                    }
                )
            },
            addNewAddress: function( e, item ){
                Store.address = item;
                this.$router.push( '/index/confirm/addressAdd' );
            }
        }
    }
})();

export default _default;