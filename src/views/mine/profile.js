'use strict';

import Utils from '@/directives/utils'
import Toast from '@/directives/toast'
import MineAPI from "@/services/mine-service";

var _default = (function(){

    return {
        name: 'cart-index',
        mounted: function(){

			var self = this;

			MineAPI.profile({
				uid : 73486241289
			}, function( data ){
				
				if (data.code == 0 ){
					var babyInfo = data.data ? (data.data.babys ? (data.data.babys.length ? data.data.babys[0] : {}) : {} ) : {};
					self.avatar = (data.user ? data.user.avatar : '');
					self.name = (data.user ? data.user.nickName : '');
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
            	avatar: '',
            	name: '',
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
                //	MineAPI.login();
                MineAPI.updateProfile( this.avatar, this.name, this.sex, Utils.dateFromString(this.birthDate).getTime(), function( data ){
                	
                	console.log( data );
                } );
            }
        }
    }
})();

export default _default;