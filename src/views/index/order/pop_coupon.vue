<template>
    <div id="pop_coupon" class="tm-order-pop_coupon">
        <div class="null" v-touch:tap="{ event: goToConfirm, params: [] }"></div>
        <div class="content">
            <em class="title">优惠券</em>
            <span class="notUse" v-touch:tap="{ event: selectedCoupon, params: [ {'available' : true}, '-1' ]}">不使用优惠券<img class="sel" :src="defaultCoupon==-1 ? 'https://ts.zlimg.com/v2/h5/jd/base_selected.png' : 'https://ts.zlimg.com/v2/h5/jd/base_unselected.png'"/></span>
            <div class="coupons" v-for="item in couponItem" v-touch:tap="{ event: selectedCoupon, params: [ item, item.couponId ]}" :class="!item.available ? 'backgroundnotOptional' : 'backgroundOptional'">
                <span class="main">
                    <span class="money" :class="!item.available ? 'moneyNotOptional' : 'moneyOptional'">
                        <dfn>￥</dfn><em>{{item.couponMoney /1000}}</em>
                    </span>
                    <span class="box">
                        <em :class="!item.available ? 'contentNotOptional' : 'contentOptional'">{{item.couponContent}}</em>
                        <dfn :class="!item.available ? 'notOptional' : 'optional'">{{item.displayName}}</dfn>
                    </span>
                    <img class="use" :src="item.couponId == defaultCoupon ? 'https://ts.zlimg.com/v2/h5/jd/base_selected.png' : 'https://ts.zlimg.com/v2/h5/jd/base_unselected.png'"/>
                </span>
                <span class="validity">
                    <em :class="!item.available ? 'moneyNotOptional' : 'moneyOptional'"> {{item.expireTime | surplus}} 天后过期</em>
                    <dfn :class="!item.available ? 'notOptional' : 'optional'">有效期至： {{item.expireTime | expire}} </dfn>
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