'use strict';
import Store from '@/directives/store';
import indexAPI from "@/services/index-service";

var _default = (function(){
    
    return {
        name: 'order-addressAdd',
        mounted: function(){
            var that = this;
            console.log(Store.address);
            that.address = Store.address;
            that.addressConsignee = (Store.address ? Store.address.addressConsignee : '');
            that.consigneeSex = (Store.address ? (Store.address.consigneeSex == 1 ? true : false) : true);
            that.sexIndex = that.consigneeSex ? 1 : 0;
            that.consigneePhone = (Store.address ? Store.address.consigneePhone : ''); 
            that.gdProvinceName = (Store.address ? Store.address.gdProvinceName : '');
            that.gdCityName = (Store.address ? Store.address.gdCityName : '');
            that.gdAdName = (Store.address ? Store.address.gdAdName : '');
            that.gdBusinessArea = (Store.address ? Store.address.gdBusinessArea : '');
            that.gdTitle = (Store.address ? Store.address.gdTitle : '');
            that.addressAll = that.gdProvinceName + that.gdCityName + that.gdAdName + that.gdBusinessArea + that.gdTitle; 
            that.addressDetail = (Store.address ? Store.address.addressDetail : '');
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                address : null,
                addressConsignee : null,
                consigneeSex : null,
                consigneePhone : null,
                gdProvinceName : null,
                gdCityName : null,
                gdAdName : null,
                gdBusinessArea : null,
                gdTitle : null,
                addressAll : null,
                addressDetail : null,
                sexIndex : null
            };
        },
        methods: {
            selectedSex : function( e, state){
            
                this.consigneeSex = state;
                this.sexIndex = state ? 1 : 0;
            },
            addressSave : function(){
                console.log(this.address);
                console.log(this.addressConsignee);
//              indexAPI.addressUpdata(
//                  {
//                      
//                  },
//                  function(data) {
//                      console.log(data);
//                  })
//              )
            },
            cellHref: function( e, url ){
        
                this.$router.push( url );
            }
        }
    }
})();

export default _default;