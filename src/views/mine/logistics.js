'use strict';
import Vue from "vue";
import Axios from 'axios';

var _default = (function(){

    return {
        name: 'order-logistics',
        mounted: function(){
            var that = this;
        
            Axios.get('/order/express/list', {
                params : {
                    orderId : 86985573038,
                }
            })
            .then(function (response) {
                var data = response.data;
                
                if (data.code == 0) {
                    var logistics = data.data.expressList;
                    logistics.forEach(function(item){
                        if(item.expressType == 200){
                            that.expressMail.push(item);
                        }else {
                            that.expressReturn.push(item);
                        }
                    });
                     
                } else {
                    console.log(results);
                }
            })
            .catch(function (error) {
                console.log(error);
            }); 
            
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
                expressMail : [],
                expressReturn : [],
            	tabIndex: 0,
            };
        },
        methods: {
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