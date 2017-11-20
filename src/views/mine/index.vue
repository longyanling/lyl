<template>
	<div id="mine-index" class="tm-mine-index">
		<div class="heading">
			<span class="header"><img class="img" :src="userInfoItem.avatar"/></span>
			<span class="nicksex" v-touch:tap="{ event : goToProfile, params : [ ]}">
				<em>{{userInfoItem.nickName}}</em>
				<span><dfn>{{babyInfoItem.ageStr}}</dfn> <dfn>{{babyInfoItem.sexStr}}</dfn></span>
			</span>
		</div>
		<div class="main">
		    <span class="item" v-touch:tap="{ event : goToOrder, params : [ ]}">
                <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/mine_order.png"/>
                <var>我的订单</var>
                <img class="arrow" src="https://ts.zlimg.com/ap/home_button_entry.png"/>
            </span>
			<span class="item" v-touch:tap="{ event : goToCoupon, params : [ ]}">
			    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/mine_coupon.png"/>
			    <var>我的优惠券</var>
			    <img class="arrow" src="https://ts.zlimg.com/ap/home_button_entry.png"/>
			</span>
			<span class="item margin_top_10" v-touch:tap="{ event : goToCoupon, params : [ ]}">
                <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/mine_address.png"/>
                <var>常用地址</var>
                <img class="arrow" src="https://ts.zlimg.com/ap/home_button_entry.png"/>
            </span>
            <span class="item" v-touch:tap="{ event : goToCoupon, params : [ ]}">
                <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/mine_problem.png"/>
                <var>常见问题</var>
                <img class="arrow" src="https://ts.zlimg.com/ap/home_button_entry.png"/>
            </span>
            <span class="item" v-touch:tap="{ event : goToCoupon, params : [ ]}">
                <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/mine_omine.png"/>
                <var>关于我们</var>
                <img class="arrow" src="https://ts.zlimg.com/ap/home_button_entry.png"/>
            </span>
		</div>
	</div>
</template>

<script>
	
	import Index from '@/views/mine/index.js'
	import '@/views/mine/index.scss'
	
	export default Index;
	
</script>