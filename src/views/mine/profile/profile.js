'use strict';

import Utils from '@/directives/utils';
import Toast from '@/directives/toast';
import API from '@/services/api';

var _default = (function(){

    return {
        name: 'profile',
        mounted: function(){

			var vm = this;
			
			API.Mine.profile(function(data){

				vm.userInfo = data.data.user || {};
				vm.babyInfo = (data.data.babys && data.data.babys.length ? data.data.babys[0] : {} ) ;
				vm.babyInfo.birthDateText = Utils.Date.toString(Utils.Date.fromTicks(vm.babyInfo.birthDate), 'yyyy年MM月dd日');
			});
        },
        data: function(){
            
            return {
				userInfo: {},
            	babyInfo: {}
            };
        },
        methods: {
            sexChange: function( e, sex ){
                
            	this.babyInfo.babySex = sex;
            },
            birthPicker: function(){
            	
        		this.$router.push( '/mine/profile/birthdate?date=' + this.babyInfo.birthDate );
            },
            birthReset: function( date ){
            	
        		this.babyInfo.birthDate = parseInt(date, 10);
        		this.babyInfo.birthDateText = Utils.Date.toString(Utils.Date.fromTicks(date), 'yyyy年MM月dd日');
            },
            submit: function(){
           
           		var vm = this;
           		
           		API.Mine.update({
					'avatar': vm.userInfo.avatar,
					'name': vm.userInfo.nickName,
					'babySex': vm.babyInfo.babySex,
					'babyBD': vm.babyInfo.birthDate
           		},function(data){
           			if(data.code == 0){
           			    Toast.show("更新成功");
           			    vm.$router.push('/mine');
           			}else {
           			    Toast.show("更新失败");
           			}
           		});
            },
            login: function(){

				MineAPI.login();
            }
        }
    }
})();

export default _default;