<template>
    <div id="coupons" class="tm-order-coupon-list" v-touch:tap="{ event: deactive, params: [] }">
        <div class="datalist">
            <div class="couponnone" v-touch:tap="{ event: itemSelect, params: [ {'available' : true}, '-1' ]}">
                <a :class="couponDefault==-1 ? 'selected':'' ">不使用优惠券</a>
            </div>
            <div class="couponlist">            
                <div class="couponitem" v-for="item in couponItems" v-touch:tap="{ event: itemSelect, params: [ item, item.couponId ]}" :class=" [item.couponId==couponDefault ? 'selected' : '',!item.available ? 'disabled' : '']">
                    <span class="info">
                        <span class="money">
                            <small>￥</small>
                            <em>{{item.couponMoney | money}}</em>
                        </span>
                        <span class="checkbox"></span>
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
        </div>
    </div>
</template>

<script>
    import Copuons from '@/views/index/order/coupon/pop_list.js';
    import '@/views/index/order/coupon/pop_list.scss';

    export default Copuons;
</script>