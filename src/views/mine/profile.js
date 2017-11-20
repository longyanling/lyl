'use strict';

import Toast from '@/directives/toast'
import MineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'cart-index',
        mounted: function(){

			MineAPI.profile({
				uid : 73486241289
			}, function( data ){
				
				if (data.code == 0 ){
					
				} else {
            		Toast.show('12341234');
				}
			});
			
			Toast.show('12341234');
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