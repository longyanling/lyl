<template>
    <div id="pop_coupon" class="tm-order-pop_coupon">
        <div class="null" v-touch:tap="{ event: cellHref, params: ['/mine/order/confirm'] }"></div>
        <div class="content">
            <em class="title">优惠券</em>
            <span class="notUse">不使用优惠券<img class="sel" src="https://ts.zlimg.com/v2/h5/jd/base_selected.png"/></span>
            <div class="list">
                <span class="detail">
                    <!--<span class="price">￥<var>50</var></span>
                    <span class= "con">
                        
                    </span>-->
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderCoupon from '@/views/mine/pop_coupon.js';
    import '@/views/mine/pop_coupon.scss';

    export default OrderCoupon;
</script>