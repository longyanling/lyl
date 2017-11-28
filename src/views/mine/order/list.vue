<template>
    <div id="orders" class="tm-mine-order-list">
        <div class="navigation">
            <span v-for="(item, index) in statusItems" v-touch:tap=" { event: statusChange, params: [index] }" :class="index==statusIndex ? 'selected':''">
                <em> {{item}} </em>
            </span>
        </div>
        <div class="datalist">
            <div class="item" v-for="item in orderItems[statusIndex]">
            	<div class="caption">
                    <em class="id">订单号：{{item.orderId}}</em>
                    <dfn class="status">{{item.statusName}}</dfn>
                </div>
                <div class="toylist" v-touch:tap="{ event: goToDetail, params: [item.orderId]}">
                    <div class="toyitem" v-for="(toy, index) in item.toys" v-show="toy.visible || index<2">
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
                <div class="expand" v-show="item.toys.length > 2" v-touch:tap="{ event: goToDetail, params: [item.orderId]}">.&nbsp;.&nbsp;.</div>                
                <div class="total">
                	共 <strong>3</strong> 件玩具， 
                	租期 <strong>2</strong> 天 
                </div>
                <div class="actions">
                	<span class="clock" v-show="1>0 || item.status == 0">
                		<em>倒计时:</em>
                		<var>{{item.createTime | clock}}</var>
                	</span>
                    <a class="button submit" v-show="item.status == 0">立即付款</a>
                    <a class="button circle" v-show="item.status == 1" v-touch:tap="{ event: publicRouting, params: ['/toy']}">再次下单</a>
                    <a class="button" v-show="item.status == 2 || item.status == 3 || item.status == 4 || item.status == 5 || item.status == 6" v-touch:tap="{ event: goToLogistics, params: [item.orderId]}">物流信息</a>
                    <a class="button" v-show="item.status == 7 || item.status == 11 || item.status==12 || item.status == 13 " v-touch:tap="{ event: publicRouting, params: [ ]}">再租几件</a>
                    <a class="button" v-show="item.status == 7 || item.status == 8 || item.status==9">物流信息</a>
                    <a class="link" v-show="item.status == 0">取消订单</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Order from '@/views/mine/order/list.js';
    import '@/views/mine/order/list.scss';
    
    export default Order;
</script>