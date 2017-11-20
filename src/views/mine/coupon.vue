<template>
    <div id="mine-coupon" class="tm-mine-coupon">
        <div class="coupons">
        	<span class="main">
        	    <span class="money"><dfn>￥</dfn><em>100</em></span>
        	    <span class="title">
        	        <em>11.11专享优惠劵</em>
        	        <dfn>总租金满299元可使用</dfn>
        	    </span>
        	    <span class="use" v-touch:tap="{ event : goToToy , params:[ ]}">立即使用</span>
        	</span>
        	<span class="validity">
        	    <em>15天后过期</em>
                <dfn>有效期至：2017-12-12</dfn>
        	</span>
        </div>
    </div>
    
</template>

<script>
    import Coupon from '@/views/mine/coupon.js';
    import '@/views/mine/coupon.scss';

    export default Coupon;
</script>
