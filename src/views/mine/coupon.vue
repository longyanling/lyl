<template>
    <div id="mine-coupon" class="tm-mine-coupon">
        <div class="coupons" v-for="item in couponItems">
        	<span class="main">
        	    <span class="money">
        	    	<dfn>￥</dfn><em>{{item.couponMoney / 1000}}</em>
        	    </span>
        	    <span class="title">
        	        <em>{{item.couponContent}}</em>
        	        <dfn>{{item.displayName}}</dfn>
        	    </span>
        	    <span class="use" v-touch:tap="{ event : goToToy , params:[ ]}">立即使用</span>
        	</span>
        	<span class="validity">
        	    <em> {{item.expireTime | surplus}} 天后过期</em>
                <dfn>有效期至： {{item.expireTime | expire}} </dfn>
        	</span>
        </div>
    </div>
    
</template>

<script>
    import Coupon from '@/views/mine/coupon.js';
    import '@/views/mine/coupon.scss';

    export default Coupon;
</script>
