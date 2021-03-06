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

				data = data.data || {};
				vm.userInfo = data.user || {};
				vm.babyInfo = (data.babys && data.babys.length ? data.babys[0] : { birthDate: 1472313600000, babySex: 0 } ) ;
				vm.babyInfo.birthDateText = Utils.Date.toString(Utils.Date.fromTicks(vm.babyInfo.birthDate || 1472313600000), 'yyyy年MM月dd日');
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
            	_hmt.push(["_trackEvent", "link", "click", "我的-宝宝信息-修改性别"]);
            },
            birthPicker: function(){
            	
        		this.$router.push( '/mine/profile/birthdate?date=' + this.babyInfo.birthDate );
        		_hmt.push(["_trackEvent", "link", "click", "我的-宝宝信息-进入修改年龄"]);
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
           			    vm.$router.back( -1 );
           			}else {
           			    Toast.show("更新失败");
           			}
           		});
           		_hmt.push(["_trackEvent", "link", "click", "我的-宝宝信息-保存"]);
            },
            login: function(){

				MineAPI.login();
            }
        }
    }
})();

export default _default;