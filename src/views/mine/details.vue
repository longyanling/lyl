<template>
    <div id="order-details">
        <div class="tm-order-details" v-for="item in detailsItem">
            <div class="status">
                <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_icon_listdetail.png"/>
                <div class="content">
                    <span class="name">订单状态：<span class="statusName">{{item.statusName}}</span></span>
                    <span class="sum">订单号：<span>{{item.orderId}}</span></span>
                    <span class="time">下单时间：<span>2017-09-17 17:15</span></span>
                </div>
            </div>
            <div class="main">
            	<div class="address">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_address_clickable.png"/>
                    <div class="content">
                        <span class="take">收货人：<span class="name">{{item.userName}}</span><span class="tel">{{item.phone}}</span></span>
                        <span class="detail">{{item.address}}</span>
                    </div>
                </div>
                <div class="mode">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_time_click.png"/>
                    <div class="content">
                        <em class="name">配送方式</em>
                        <span class="detail">{{item.deliveryMethodName}}<span class="con">2017/09/08 (周六)配送</span></span>
                    </div>
                </div>
                <div class="lease">
                    <img class="sign" src="https://ts.zlimg.com/v2/h5/jd/order_rentdate_clickable.png"/>
                    <div class="content">
                        <em class="name">租期</em>
                        <span class="detail">{{item.rentPeriod}}天<span class="con">2017/09/08 (周六)到期</span></span>
                    </div>
                </div>
            </div>
    
            <div class="money">
                <div class="rent ho">
                    <em class="title">总租金</em>
                    <var class="sum">￥{{item.totalRent /1000}}</var>
                </div>
                <div class="freight ho">
                    <em class="title">运费</em>
                    <var class="sum">￥{{item.deliveryMoney /1000}}</var>
                </div>
                <div class="total ho">
                    <em class="title">订单合计</em>
                    <var class="sum colorb3">￥{{item.rentDiscount /1000}}</var>
                </div>
            </div>
    
            <div class="deposit">
                <em class="title">本单押金</em>
                <span class="prompt">{{item.channelPayMsg}}</span>
                <var class="sum">￥{{item.deposit /1000}}</var>
            </div>
            <div class="toys">
                <div class="title">
                    <ins></ins>
                    <em class="con">玩具列表</em>
                    <dfn class="price">{{item.unitRent /1000}}元<var class="day">/天</var></dfn>
                </div>
                <div class="list">
                    <div class="content" v-for="toy in item.toys">
                        <img class="toyImg" :src="toy.image"/>
                        <div class="texts">
                            <span class="toyName">{{toy.toyName}}</span>
                            <dfn class="toyAge">适合年龄：{{toy.ageRange}}</dfn>
                            <div class="labels">
                                <img class="toyLabel" :src="toy.toySize == 'XL' ? 'https://ts.zlimg.com/ap/op_toy_size_XL.png' : (toy.toySize == 'L' ? 'https://ts.zlimg.com/ap/op_toy_size_L.png' : (toy.toySize == 'M' ? 'https://ts.zlimg.com/ap/op_toy_size_M.png' : (toy.toySize == 'S' ? 'https://ts.zlimg.com/ap/op_toy_size_S.png' : '')))"/>
                                <img class="toyLabel" v-show="toy.isRecommend" src="https://ts.zlimg.com/jd/toy_recommend.png" />
                                <img class="toyLabel" v-show="toy.isLatest" src="https://ts.zlimg.com/jd/toy_recent.png" />
                                <img class="toyLabel" v-show="toy.isHot" src="https://ts.zlimg.com/jd/toy_hot.png" />
                                <img class="toyLabel" v-show="toy.isSpecialMoney" src="https://ts.zlimg.com/jd/toy_favour.png" />
                                <img class="toyLabel" v-show="toy.canPostal" src="https://ts.zlimg.com/jd/tag_post.png" />
                            </div>
                        </div>
                        <dfn class="price">{{toy.realRentMoney /1000}}元<var class="unit">/天</var></dfn>
                    </div>
                </div>
            </div>
            <div class="actions">
                <!--<div class="right all">立即付款</div>-->
                <!--<div class="right all">再次下单</div>-->
                <div class="right all" v-touch:tap="{ event: cellHref, params: ['/mine/order/logistics']}">物流信息</div>
                <!--<div class="right all">再租几件</div>-->
                <div class="left all">取消订单</div>
                <!--<div class="left all">物流信息</div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Details from '@/views/mine/details.js';
    import '@/views/mine/details.scss';

    export default Details;
</script>