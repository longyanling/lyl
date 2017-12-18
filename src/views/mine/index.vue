<template>
	<div id="mine-index" class="tm-mine-index">
		<div class="heading">
			<span class="avatar"><img :src="userInfo.avatar" class="image" /></span>
			<span class="info">
				<em class="nick">{{userInfo.nickName ? userInfo.nickName : '未登录'}}</em>
				<a class="button" v-show="loginState" v-touch:tap="{ event : go, params : [ '/mine/profile' ] }">宝宝信息<var></var></a>
				<a class="button" v-show="!loginState" v-touch:tap="{ event : go, params : [ '/mine/login' ]}">立即登录<var></var></a>
				<var class="age-sex">
					<dfn>{{babyInfo.sexStr ? babyInfo.sexStr : ''}}</dfn>
					<dfn>{{babyInfo.ageStr ? babyInfo.ageStr : ''}}</dfn>
				</var>
				
			</span>
			
		</div>
		<div class="cells">
			<div class="group">
			    <span class="item" v-for="item in userMenus" v-touch:tap="{ event : go, params : [ item.url ]}">
	                <img class="icon" :src="item.icon"/>
	                <var class="text">{{item.text}}</var>
	                <img class="arrow" src="https://ts.zlimg.com/ap/home_button_entry.png" />
	            </span>
            </div>
			<div class="group">
			    <span class="item" v-for="item in systemMenus" v-touch:tap="{ event : go, params : [ item.url ]}">
	                <img class="icon" :src="item.icon"/>
	                <var class="text">{{item.text}}</var>
	                <img class="arrow" src="https://ts.zlimg.com/ap/home_button_entry.png" />
	            </span>
            </div>
		</div>
	</div>
</template>

<script>
	
	import Index from '@/views/mine/index.js'
	import '@/views/mine/index.scss'
	
	export default Index;
	
</script>