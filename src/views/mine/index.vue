<template>
	<div id="mine-index" class="tm-mine-index">
		<div class="heading">
			<span class="avatar"><img :src="userInfo.avatar" class="image" /></span>
			<span class="info" v-touch:tap="{ event : go, params : [ '/mine/profile' ]}">
				<em class="nick">{{userInfo.nickName}}</em>
				<var class="age-sex">
					<dfn>{{babyInfo.ageStr}}</dfn>
					<dfn>{{babyInfo.sexStr}}</dfn>
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
		
		<a v-touch:tap="{ event : login, params : [ ]}" style="display:block; line-height:36px; text-align:center; ">登录</a>
	</div>
</template>

<script>
	
	import Index from '@/views/mine/index.js'
	import '@/views/mine/index.scss'
	
	export default Index;
	
</script>