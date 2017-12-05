<template>
	<div id="login" class="tm-mine-login">
		<span class="element">
			<input type="text" v-model="phone" class="text" />
		</span>
		<span class="element">
			<input type="text" v-model="password" class="text" />
		</span>
		<button type="button" v-touch:tap="{ event: submit, params: [] }" class="button"> 登 录 </button>
	</div>
</template>

<script>
	
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
				
				console.log(this.phone);
				console.log(this.password);
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