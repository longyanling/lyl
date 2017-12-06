<template>
	<div id="login" class="tm-mine-login">
		<span class="element">
			<input type="text" v-model="phone" class="text" />
		</span>
		<span class="element">
			<input type="password" v-model="password" class="text" />
		</span>
		<button type="button" v-touch:tap="{ event: submit, params: [] }" class="button"> 登 录 </button>
	</div>
</template>

<script>
	import API from "@/services/api";
	import MD5 from '@/directives/md5';
	import Toast from '@/directives/toast';
	
	export default {
		name: 'login',
		data: function(){
			
			return {
				phone: '',
				password: ''
			};
		},
		methods: {
			submit: function() {
			    var vm = this;
                API.Mine.login(
                    {
                        'phone': vm.phone,
                        'pwd': MD5(vm.password),
                        'cityCode': '010'  
                    },function(data){
                        if(data.code == 0){
                            Toast.show('登录成功');
                            vm.$router.push( '/index' );
                        }else {
                            Toast.show('登录失败，请检查账号密码是否正确');
                        }
                    
                });
			}
		}
	}
	
</script>

<style lang="scss">
	
	.tm-mine-login {
		text-align: center;
		padding: 15px;
	
		.element {
			display:block;
			height:36px;
			padding:10px 0px;
			
			.text {
				display:block;
				width:100%;
				height:36px;
				line-height:36px;
				border:0px;
			}
		}
		.button {
			display:block;
			width:100%;
			height:36px;
			margin-top:10px;
			border:0px;
		}
	}
</style>