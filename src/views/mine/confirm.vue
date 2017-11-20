<template>
    <div id="order-confirm">
        <div class="tm-order-confirm" v-for="seed in moneysItem">
        	<div class="location" v-for="item in addressItem" v-touch:tap="{event:cellHref,params:['/mine/order/confirm/addressList']}">
                <img class="clickable" src="https://ts.zlimg.com/v2/h5/jd/order_address_clickable.png"/>
                <div class="main">
                    <span class="content"><dfn class="name">{{item.addressConsignee}}</dfn><dfn class="sex">{{item.consigneeSex == 0 ? '先生' : '女士'}}</dfn><dfn>{{item.consigneePhone}}</dfn></span>
                    <span class="detail">{{item.addressTotal}}</span>
                </div>
                <img class="entry" src="https://ts.zlimg.com/v2/h5/jd/home_button_entry.png"/>
            </div>
            <div class="select">
                <div class="delivery" v-touch:tap="{event:cellHref, params: ['/mine/order/confirm/distribution']}">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_time_clickable.png"/>
                    <span class="text">配送信息</span>
                    <img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/home_button_entry.png"/>
                    <div class="opt">
                        <span class="frist"></span>
                        <span class="last color57">育儿师上门</span>
                    </div>
                </div>
                <div class="delivery" v-touch:tap="{event:cellHref, params: ['/mine/order/confirm/lease']}">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_rentdate_clickable.png"/>
                    <span class="text">租期</span>
                    <img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/home_button_entry.png"/>
                    <span class="opt">
                        <span class="frist">{{seed.rentPeriod}}天</span>
                        <span class="last">({{}})到期</span>
                    </span>
                </div>
                <div class="coupon" v-touch:tap="{event:cellHref, params: ['/mine/order/confirm/coupon']}">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_coupon_clickable.png"/>
                    <span class="text">优惠券</span>
                    <img class="arrow" src="https://ts.zlimg.com/v2/h5/jd/home_button_entry.png"/>
                    <span class="last">暂无可用的优惠券</span>
                </div>
            </div>
            <div class="money">
                <div class="rent ho">
                    <em class="title">总租金</em>
                    <span class="prompt">({{seed.totalRentMsg}})</span>
                    <var class="sum">￥{{seed.totalRent / 1000}}</var>
                </div>
                <div class="freight ho">
                    <em class="title">运费</em>
                    <span class="prompt">({{seed.deliveryMsg}})</span>
                    <var class="sum">￥{{seed.deliveryMoney / 1000}}</var>
                </div>
                <div class="total ho">
                    <em class="title">合计</em>
                    <span class="prompt">({{seed.payOrderMsg}})</span>
                    <var class="sum colorb3">￥{{seed.payOrder / 1000}}</var>
                </div>
            </div>
    
            <div class="deposit">
                <em class="title">订单押金</em>
                <span class="prompt">{{seed.depositMsg}}</span>
                <var class="sum">￥{{seed.payDeposit / 1000}}</var>
            </div>
            <div class="toys">
                <div class="title">
                    <ins></ins>
                    <em class="con">玩具列表</em>
                    <var class="price">{{seed.unitRent}}元<var class="day">/天</var></var>
                </div>
                <div class="list">
                    <div class="content" v-for="item in toyItem">
                        <img class="toyImg" :src="item.image"/>
                        <div class="texts">
                            <span class="toyName">{{item.toyName}}</span>
                            <span class="toyAge">适合年龄：{{item.ageRange}}</span>
                            <div class="labels">
                                <dfn class="size">中</dfn>
                                <dfn class="recommend" v-show="item.isRecommend">荐</dfn>
                                <dfn class="new" v-show="item.isLatest">新</dfn>
                                <dfn class="hot" v-show="item.isHot">热</dfn>
                                <dfn class="benefit" v-show="item.isSpecialMoney">惠</dfn>
                                <dfn class="post" v-show="item.canPostal">可邮寄</dfn>
                            </div>
                        </div>
                        <var class="price">{{item.rentMoney / 1000}}元<var class="unit">/天</var></var>
                    </div>
                </div>
                <div class="submit">
                    <span class="price">物品总价值：<span>￥{{seed.payMoney / 1000}}</span></span>
                    <span class="apply" v-touch:tap="{event:cellHref, params: ['/mine/order']}">申请免押租用</span>
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Confirm from '@/views/mine/confirm.js';
    import '@/views/mine/confirm.scss';

    export default Confirm;
</script>