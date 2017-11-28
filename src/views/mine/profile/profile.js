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
            sexChange: function( sex ){
            	
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
           
           		var self = this;
           		
           		API.Mine.update({
					'avatar':this.userInfo.avatar,
					'name':this.userInfo.nickName,
					'babySex': this.babyInfo.babySex,
					'babyBD': this.babyInfo.birthDate
           		},function(data){
           			
           			console.log(data);
           		});
            },
            login: function(){

				MineAPI.login();
            }
        }
    }
})();

export default _default;