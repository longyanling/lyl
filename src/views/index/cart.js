'use strict';
import Vue from 'vue';
import Axios from 'axios';

var _default = (function(){
     
    return {
        name: 'index-cart',
        mounted: function(){
            var self = this;
            
            Axios.get('/cart/list', {
                
            })
            .then(function (response) {
                var data = response.data;
                if (data.code == 0) {
                    self.shoppingItem = data.data;
                } else {
                    console.log(results);
                }
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });

        },
        destoryed: function(){

        },
        data: function(){
           
            return {
                shoppingItem : [ ],
                          
            };
        },
        methods: {
            cellHref: function( e, url ){
        
                this.$router.push( url );
            },
            goToToyDetail : function(){
                this.$router.push('/index/detail' );
            },

            goToToy : function() {
                this.$router.push('/index');
            },
            goToOrder : function() {
                this.$router.push('/index/confirm');
            }
            
            
        }
    }
})();

export default _default;