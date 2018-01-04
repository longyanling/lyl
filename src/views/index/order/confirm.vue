<template>
    <div id="order-confirm" class="tm-order-confirm">
        <div class="address" v-touch:tap="{event: showPopup,params:['/index/confirm/address']}">
            <var class="icon"></var>
            <var class="arrow"></var>
            <span class="info">
                <em class="cell">
                    <var>{{addressName}} </var>
                    <var>{{addressSex}} </var>
                    <var>{{addressPhone}} </var>
                </em>
                <em class="cell">
                    <var>{{addressDetail}}</var>
                </em>
            </span>
        </div>
        <div class="group">
            <span class="cell multi" v-touch:tap="{ event: showPopup, params: ['/index/confirm/distribution'] }">
                <var class="icon delivery"></var>
                <em class="label">配送信息</em>
                <var class="arrow"></var>
                <dfn class="value">
                    <strong>{{defaultTime}}</strong>
                    <small>{{defauitName}}</small>
                </dfn>
            </span>
            <span class="cell multi" v-touch:tap="{ event: showPopup, params: ['/index/confirm/lease'] }">
                <var class="icon period"></var>
                <em class="label">租期</em>
                <var class="arrow"></var>
                <dfn class="value">
                    <strong>{{confirmItem.rentPeriod}} 天</strong>
                    <small>({{confirmItem.endTime | expire}}到期)</small>
                </dfn>
            </span>
            <span class="cell signle" v-touch:tap="{ event: showPopup, params: ['/index/confirm/coupon'] }">
                <var class="icon coupon"></var>
                <em class="label">优惠券</em>
                <var class="arrow"></var>
                <dfn class="value">
                    <var v-show="confirmItem.coupon && defaultCoupon != -1">{{couponName}}</var>
                    <var class="gray" v-show="!confirmItem.coupon && defaultCoupon == -1">不使用优惠券</var>
                    <var class="gray" v-show="!confirmItem.coupon && defaultCoupon != -1">{{confirmItem.couponList && confirmItem.couponList.length ? '提高总租金以使用优惠' : '没有可用优惠券'}}</var>
                </dfn>
            </span>
        </div>        
        <div class="group">
            <span class="cell signle">
                <em class="text">总租金 <small>({{confirmItem.totalRentMsg}})</small></em>
                <dfn class="element">
                    <var>￥{{confirmItem.totalRent ? confirmItem.totalRent/1000 : '0'}}</var>
                </dfn>
            </span>
            <span class="cell signle">
                <em class="text">运费 <small>({{confirmItem.deliveryMsg}})</small></em>
                <dfn class="element">
                    <var>￥{{confirmItem.deliveryMoney ? (confirmItem.deliveryMoney - (confirmItem.deliveryDiscount ? confirmItem.deliveryDiscount : 0))/1000 : '0'}}</var>
                </dfn>
            </span>
            <span class="cell signle" v-show="confirmItem.rentDiscount > 0 ">
                <em class="text">优惠</em>
                <dfn class="element">
                    <var>-￥{{confirmItem.rentDiscount ? confirmItem.rentDiscount/1000 : '0'}}</var>
                </dfn>
            </span>
            <span class="cell signle">
                <em class="text">合计 <small>({{confirmItem.payOrderMsg}})</small></em>
                <dfn class="element">
                    <strong>￥{{confirmItem.payOrder ? confirmItem.payOrder/1000 : '0'}}</strong>
                </dfn>
            </span>
        </div>

        <div class="group">
            <div class="cell single">
                <em class="text">
                    <span class="jdlogo" v-show="confirmItem.isJdCreditEnough && !confirmItem.isJdPayDepositMore"></span>
                    {{confirmItem.isJdCreditEnough && !confirmItem.isJdPayDepositMore ? '小白信用免押' : '订单押金'}} 
                    <small v-show="!confirmItem.isJdCreditEnough && !confirmItem.isJdPayDepositMore">(小白信用不足，未享用免押服务)</small>
                    <small v-show="!confirmItem.isJdCreditEnough && confirmItem.isJdPayDepositMore">(小白信用不足，未享用免押服务)</small>
                    <small v-show="confirmItem.isJdCreditEnough && confirmItem.isJdPayDepositMore">(当前押金超过2000元，需支付押金)</small>
                </em>
                <dfn class="element">
                    <var v-show="confirmItem.isJdCreditEnough && confirmItem.isJdPayDepositMore">￥{{confirmItem.deposit ? confirmItem.deposit / 1000 : '0'}}</var>
                    <var v-show="!confirmItem.isJdCreditEnough && !confirmItem.isJdPayDepositMore">￥{{confirmItem.deposit ? confirmItem.deposit / 1000 : '0'}}</var>
                    <var v-show="!confirmItem.isJdCreditEnough && confirmItem.isJdPayDepositMore">￥{{confirmItem.deposit ? confirmItem.deposit / 1000 : '0'}}</var>
                    <s v-show="confirmItem.isJdCreditEnough && !confirmItem.isJdPayDepositMore">￥{{confirmItem.deposit ? confirmItem.deposit / 1000 : '0'}}</s>
                </dfn>
            </div>
        </div>
        
        <div class="toys">
            <div class="caption">
                <ins></ins>
                <em>玩具列表</em>
                <dfn>{{toyALLPrice}}元<small>/天</small></dfn>
            </div>
            <div class="itemtoys">
                <div class="toylist">
                    <div class="toyitem" v-for="item in toyItems">
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
        </div>
        <div class="controls">
            <span class="price">物品总价值：<dfn>￥{{confirmItem.payMoney ? confirmItem.payMoney / 1000 : '0'}}</dfn></span>
            <a :class="jdPayState ? 'button' : 'button atqing'" v-touch:tap="{event:payment, params: []}">{{jdPay}}</a>
        </div>
        <div style="background:#ff0000">
        	<router-view @resetAddressId="setAddressId" @resetDistribution="setDistribution" @resetDate="setDate" @resetCoupon="setCoupon" :coupon = 'coupons' :distribution = 'distributions' :lease = 'leases'></router-view>
        </div>
        <tm-modal ref="modal" :success="success" :cancel="cancel"></tm-modal>
        <form id="jdPayment" action="/order/pay/jd" method="post">
            <input type="hidden" id="seqId" name="seqId" />
            <input type="hidden" id="orderId" name="orderId" />
        </form>
        <div class="loading" v-show="loadingShow"><img src="https://ts.zlimg.com/v2/h5/jd/base_loading.gif"/></div>
    </div>
</template>

<script>
    import Confirm from '@/views/index/order/confirm.js';
    import '@/views/index/order/confirm.scss';

    export default Confirm;
</script>
