'use strict';

import Axios from 'axios';

var _default = (function(){
    
    return {
        name: 'pop_coupon',
        mounted: function(){

            Axios.get('/coupon/list', { })
            .then(function (response) {
                var data = response.data;
                console.log(data.data);
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
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