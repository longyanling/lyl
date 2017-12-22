<template>
    <div id="details" class="tm-mine-order-details">
    	<div class="heading">
            <img class="icon" src="https://ts.zlimg.com/v2/h5/jd/order_icon_listdetail.png"/>
            <span class="info">
            	<em class="cell"><var>订单状态 </var><strong>{{orderInfo.statusName}}</strong></em>
            	<em class="cell"><var>订单号 </var><dfn>{{orderInfo.orderId}}</dfn></em>
            	<em class="cell"><var>下单时间</var> <dfn>{{orderInfo.createTime}}</dfn></em>
            </span>
    	</div>
    	<div class="group">
    		<div class="multi">
    			<img class="icon" src="https://ts.zlimg.com/v2/h5/jd/order_address_clickable.png"/>
    			<span class="text">
    				<em><var>收货人</var> <dfn>{{orderInfo.userName}}</dfn> <ins>{{orderInfo.phone}}</ins></em>
    				<em><small>{{orderInfo.address}}</small></em>
    			</span>
    		</div>
    		<div class="multi">
    			<img class="icon" src="https://ts.zlimg.com/v2/h5/jd/order_time_click.png"/>
                <span class="text">
                	<em><var>配送方式</var></em>
                	<em>{{orderInfo.deliveryMethodName}} <small>2017/09/08 (周六)配送</small></em>
                </span>
    		</div>
    		<div class="multi">
    			<img class="icon" src="https://ts.zlimg.com/v2/h5/jd/order_rentdate_clickable.png"/>
                <span class="text">
                	<em><var>租期</var></em>
                	<em>{{orderInfo.rentPeriod}}天 <small>2017/09/08 (周六)到期</small></em>
                </span>
    		</div>
    	</div>
    	<div class="group">
    		<span class="single">
    			<em>总租金</em>
    			<dfn><small>￥</small>{{orderInfo.totalRent /1000}}</dfn>
    		</span>
    		<span class="single">
    			<em>运费</em>
    			<dfn><small>￥</small>{{orderInfo.deliveryMoney /1000}}</dfn>
    		</span>
    		<span class="single">
    			<em>订单合计</em>
    			<dfn class="total"><small>￥</small>{{orderInfo.rentDiscount /1000}}</dfn>
    		</span>
    	</div>
    	<div class="group">
    		<div class="single">
                <em>本单押金 <small>{{orderInfo.channelPayMsg}}</small></em>
                <dfn>￥{{orderInfo.deposit /1000}}</dfn>
    		</div>
    	</div>
    	<div class="toys">
            <div class="caption">
                <ins></ins>
                <em>玩具列表</em>
                <dfn>{{orderInfo.unitRent /1000}}  <small>元/天</small></dfn>
            </div>
            <div class="datalist toylist">
            	<div class="toyitem" v-for="(toy, index) in orderInfo.toys">
                    <img :src="toy.image" class="thumb" />
                    <dfn class="price">
                    	{{toy.realRentMoney / 1000}}
                    	<small class="unit">元/天</small>
                    </dfn>
                    <span class="info">
                    	<em class="title">{{toy.toyName}}</em>
                    	<span class="age">适合年龄：{{toy.ageRange}}</span>
                    </span>
                </div>
            </div>
    	</div>
    	<div class="toolbar">
    	    <a class="button" v-show="orderInfo.status == 0" v-touch:tap="{ event: orderCancel, params:[ orderInfo.orderId ]}">取消订单</a>
    	    <a class="button" v-show="orderInfo.status == 1 || orderInfo.status == 13" v-touch:tap="{ event: orderDelete, params:[ orderInfo.orderId ]}">删除订单</a>
    		<a class="button submit" v-show="orderInfo.status == 0" v-touch:tap="{event : payment, params: [ orderInfo.orderId ]}">立即付款</a>
    		<a class="button circle" v-show="orderInfo.status == 1" v-touch:tap="{ event: placeOrder, params: [ orderInfo.toys ]}">再次下单</a>
    		<a class="button" v-show="orderInfo.status == 7 || orderInfo.status == 8 || orderInfo.status==9" v-touch:tap="{ event: goLogistics, params: [orderInfo.orderId]}">物流信息</a>
    		<a class="button" v-show="orderInfo.status == 7 || orderInfo.status == 11 || orderInfo.status==12 || orderInfo.status == 13 " v-touch:tap="{ event: goIndex, params: [ ]}">再租几件</a>
    		<a class="button" v-show="orderInfo.status == 2 || orderInfo.status == 3 || orderInfo.status == 4 || orderInfo.status == 5 || orderInfo.status == 6" v-touch:tap="{ event: goLogistics, params: [orderInfo.orderId]}">物流信息</a>
    	</div>
    	<div class="loading" v-show="loadingstate"><img src="https://ts.zlimg.com/v2/h5/jd/base_loading.gif"/></div>
        <form id="paymentJd" action="/order/pay/jd" method="post">
            <input type="hidden" id="seqId" name="seqId" />
            <input type="hidden" id="orderId" name="orderId" />
        </form>
    </div>
</template>

<script>
    import Details from '@/views/mine/order/details.js';
    import '@/views/mine/order/details.scss';

    export default Details;
</script>