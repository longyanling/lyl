<template>
    <div id="coupons" class="tm-mine-coupon-list">
        <div class="couponlist">
            <div class="couponitem" v-for="item in couponItems">
            	<span class="info">
            	    <a class="button" v-touch:tap="{ event : go , params:[ '/index' ]}">立即使用</a>
            	    <span class="money">
            	    	<small>￥</small>
            	    	<em>{{item.couponMoney | money}}</em>
            	    </span>
            	    <span class="text">
            	        <em>{{item.couponContent}}</em>
            	        <dfn>{{item.displayName}}</dfn>
            	    </span>
            	</span>
            	<span class="expire">
            	    <em> {{item.expireTime | surplus}} 天后过期</em>
                    <dfn>有效期至： {{item.expireTime | expire}} </dfn>
            	</span>
            </div>
        </div>
        <div class="loading" v-show="loadingstate"><img src="https://ts.zlimg.com/v2/h5/jd/base_loading.gif"/></div>
        <div class="bitmap" v-show="couponItems.length == 0"></div>
    </div>
    
</template>

<script>
    import List from '@/views/mine/coupon/list.js';
    import '@/views/mine/coupon/list.scss';

    export default List;
</script>
