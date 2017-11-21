<template>
    <div id="pop_coupon" class="tm-order-pop_coupon">
        <div class="null" v-touch:tap="{ event: cellHref, params: ['/index/confirm'] }"></div>
        <div class="content">
            <em class="title">优惠券</em>
            <span class="notUse">不使用优惠券<img class="sel" src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/></span>
            <div class="coupons" v-for="item in couponItem">
                <span class="main">
                    <span class="money">
                        <dfn>￥</dfn><em>{{item.couponMoney /1000}}</em>
                    </span>
                    <span class="box">
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
    </div>
</template>

<script>
    import POP_Coupon from '@/views/index/order/pop_coupon.js';
    import '@/views/index/order/pop_coupon.scss';

    export default POP_Coupon;
</script>