'use strict';
import Vue from "vue";
import mineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'order-logistics',
        mounted: function(){
            var that = this;
        
          mineAPI.logistics( 
            {
                orderId : 86985573038,
            },
            function (data) {
                if (data.code == 0) {
                    var logistics = data.data.expressList;
                    logistics.forEach(function(item){
                        if(item.expressType == 200){
                            that.expressMail.push(item);
                            console.log(that.expressMail)
                        }else {
                            that.expressReturn.push(item);
                        }
                    });
                     
                } else {
                    console.log(results);
                }
            })
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                expressMail : [],
                expressReturn : [],
            	tabIndex: 0,
            	expressMailIndex : 0,
            	expressReturnIndex : 0,
            };
        },
        methods: {
            tabExpressMail : function (e,index) {
                this.expressMailIndex = index;
            },
            tabExpressReturn : function (e,index) {
                this.expressReturnIndex = index;;
            },
            cellHref: function( e, url ){
        
                this.$router.push( url );
            },
            tabShow: function(index) {
                this.tabIndex = index;
            }
        }
    }
})();

export default _default;