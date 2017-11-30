<template>
    <div id="order-confirm">
        <div class="tm-order-confirm">

        	<div class="location" v-touch:tap="{event:cellHref,params:['/index/confirm/address']}">
                <img class="clickable" src="https://ts.zlimg.com/v2/h5/jd/order_address_clickable.png"/>
                <div class="main">
                    <span class="content"><dfn class="name">{{addressName}}</dfn><dfn class="sex">{{addressSex}}</dfn><dfn>{{addressPhone}}</dfn></span>
                    <span class="detail">{{addressDetail}}</span>
                </div>
                <img class="entry" src="https://ts.zlimg.com/v2/h5/jd/home_button_entry.png"/>
            </div>

            <div class="select">
                <div class="delivery" v-touch:tap="{event:cellHref, params: ['/index/confirm/distribution']}">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_time_clickable.png"/>
                    <span class="text">配送信息</span>
                    <img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/home_button_entry.png"/>
                    <div class="opt">
                        <span class="frist">{{defaultTime}}</span>
                        <span class="last color57">{{defauitName}}</span>
                    </div>
                </div>
                <div class="delivery" v-touch:tap="{event:cellHref, params: ['/index/confirm/lease']}">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_rentdate_clickable.png"/>
                    <span class="text">租期</span>
                    <img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/home_button_entry.png"/>
                    <span class="opt">
                        <span class="frist">{{confirmItem.rentPeriod}}天</span>
                        <span class="last">({{confirmItem.endTime | expire}}到期)</span>
                    </span>
                </div>
                <div class="coupon" v-touch:tap="{event:cellHref, params: ['/index/confirm/coupon']}">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_coupon_clickable.png"/>
                    <span class="text">优惠券</span>
                    <img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/home_button_entry.png"/>
                    <span class="last" v-show="confirmItem.coupon && defaultCoupon != -1">{{couponName}}</span>
                    <span class="last" v-show="confirmItem.coupon && defaultCoupon == -1">不使用优惠券</span>
                    <span class="last" v-show="!confirmItem.coupon">{{confirmItem.couponList && confirmItem.couponList.length ? '提高总租金以使用优惠' : '没有可用优惠券'}}</span>
                </div>
            </div>

            <div class="money">
                <div class="rent ho">
                    <em class="title">总租金</em>
                    <span class="prompt">({{confirmItem.totalRentMsg}})</span>
                    <var class="sum">￥{{confirmItem.totalRent ? confirmItem.totalRent/1000 : '0'}}</var>
                </div>
                <div class="freight ho">
                    <em class="title">运费</em>
                    <span class="prompt">({{confirmItem.deliveryMsg}})</span>
                    <var class="sum">￥{{confirmItem.deliveryMoney ? confirmItem.deliveryMoney/1000 : '0'}}</var>
                </div>
                <div class="freight ho">
                    <em class="title">优惠</em>
                    <var class="sum">-￥{{confirmItem.rentDiscount ? confirmItem.rentDiscount/1000 : '0'}}</var>
                </div>
                <div class="total ho">
                    <em class="title">合计</em>
                    <span class="prompt">({{confirmItem.payOrderMsg}})</span>
                    <var class="sum colorb3">￥{{confirmItem.payOrder ? confirmItem.payOrder/1000 : '0'}}</var>
                </div>
            </div>

            <div class="deposit">
                <em class="title">订单押金</em>
                <span class="prompt">{{confirmItem.depositMsg}}</span>
                <var class="sum">￥{{confirmItem.payDeposit ? confirmItem.payDeposit / 1000 : '0'}}</var>
            </div>

            <div class="toys">
                <div class="title">
                    <ins></ins>
                    <em class="con">玩具列表</em>
                    <var class="price">{{toyALLPrice}}元<var class="day">/天</var></var>
                </div>
                <div class="itemtoys">
                    <div class="toylist">
                        <div class="toyitem" v-for="item in toyItem">
                            <img :src="item.image" class="thumb" />
                            <dfn class="price">
                                {{item.rentMoney / 1000}}
                                <small class="unit">元/天</small>
                            </dfn>
                            <span class="info">
                                <em class="title">{{item.toyName}}</em>
                                <span class="age">适合年龄：{{item.ageRange}}</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="submitpay">
                    <span class="price">物品总价值：<span>￥{{confirmItem.payMoney ? confirmItem.payMoney / 1000 : '0'}}</span></span>
                    <span class="apply" v-touch:tap="{event:payment, params: []}">京东支付</span>
                </div>
            </div>
            <router-view @resetAddressId="setAddressId" @resetDistribution="setDistribution" @resetDate="setDate" @resetCoupon="setCoupon" :coupon = 'coupons' :distribution = 'distributions' :lease = 'leases'></router-view>
        </div>
    </div>
</template>

<script>
    import Confirm from '@/views/index/order/confirm.js';
    import '@/views/index/order/confirm.scss';

    export default Confirm;
</script>