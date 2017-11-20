'use strict';

import Utils from '@/directives/utils'
import Toast from '@/directives/toast'
import MineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'cart-index',
        mounted: function(){

			var self = this;

			console.log( this.$route.query );
		
			MineAPI.profile({
				uid : 73486241289
			}, function( data ){
				
				if (data.code == 0 ){
					var babyInfo = data.data ? (data.data.babys ? (data.data.babys.length ? data.data.babys[0] : {}) : {} ) : {};
					self.sex = babyInfo.babySex;
					self.birthDate = Utils.dateFormat( Utils.dateFromTicks(babyInfo.birthDate), 'yyyy-MM-dd');
				} else {
            		Toast.show( data.msg );
				}
			});
        },
        destoryed: function(){

        },
        data: function(){
            
            return {
            	sex: 0,
            	birthDate: '' 
            };
        },
        methods: {
            cellHref: function( e, url ){
            	
                this.$router.push( url + '?birthdate=' + this.birthDate );
            },
            selectSex: function( sex ){
            	
            	this.sex = sex;
            },
            saveChange: function(){
           
                //	this.setCookie('ZL_UEC', 'Np0WxpPXx/U8Px8Tqbu+DZRXWlAdzCojtI5w/PGvu7I=', 10)
                this.$router.push( '/mine' );
                MineAPI.login();
            }
        }
    }
})();

export default _default;