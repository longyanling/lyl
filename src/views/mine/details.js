'use strict';
import Axios from 'axios';

var _default = (function(){

    return {
        name: 'order-details',
        mounted: function(){
            var that = this;
            
            Axios.get('/order/detail', {
                params : {
                    orderId : 88424999173,
                }
            })
            .then(function (response) {
                var data = response.data;
                if (data.code == 0) {
                    that.detailsItem = data.data;
                    
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