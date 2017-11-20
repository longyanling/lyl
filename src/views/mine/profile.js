'use strict';

import Axios from 'axios';

var _default = (function(){

    return {
        name: 'cart-index',
        mounted: function(){

			console.log(2222);
            Axios.get('/user/profile/jdv2', { })
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
            	sex: 0
            };
        },
        methods: {
            cellHref: function( e, url ){
                this.$router.push( url );
            },
            selectSex: function( sex ){
            	this.sex = sex;
            },
            saveChange: function(){
           
                this.setCookie('ZL_UEC', 'Np0WxpPXx/U8Px8Tqbu+DZRXWlAdzCojtI5w/PGvu7I=', 10)
                this.$router.push( '/mine' );
            },
            setCookie: function (cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                console.info(cname + "=" + cvalue + "; " + expires);
                document.cookie = cname + "=" + cvalue + "; " + expires;
                console.info(document.cookie);
            },
        }
    }
})();

export default _default;