<template>
    <div id="distribution" class="tm-order-distribution" v-touch:tap="{ event: deactive, params: [] }">
    	<div class="container">
    		<div class="caption">
    		    <span class="text">配送信息</span>
    		    <a class="button" v-touch:tap="{ event: InfoDetermine, params: [] }">确定</a>
    		</div>
    	    <div class="picker method">
    	    	<div class="subcaption"><ins></ins> 配送方式</div>
    	    	<div class="list">
                    <span class="item method" v-for="(item, index) in methodItems"  v-touch:tap="{ event: selectMethod, params: [  item.value, item ]}" v-bind:class="[(item.value == 1 && !canOnsite) || (item.value == 2 && !canPostal) ? 'disabled' : '', item.value == methodIndex ? 'selected' : '']">
                        <span class="inner">                            
                            <em class="title">{{item.title}}</em>
                            <span class="desc" >{{item.desc}}</span>
                            <img class="icon" :src="item.image" />
                            <span class="price">运费：<var>{{item.money / 1000}}</var> 元</span>
                            <dfn class="choice" v-show="item.value == methodIndex"><img src="https://ts.zlimg.com/v2/h5/jd/order_sub_choose.png"/></dfn>
                        </span>
                    </span>
                </div>
    	    </div>
    	    <div class="picker time">
    	    	<div class="subcaption"><ins></ins> 配送时间</div>
    	    	<div class="list">
                    <div class="item time" v-for="(item, index) in dayItems" v-touch:tap="{ event: selectDay, params: [ item.timestamp, item ]}" v-bind:class="item.timestamp == dayIndex ? 'selected' : ''">
                        <var class="month">{{item.year}}/{{item.month}}</var>
                        <var class="day">{{item.day}}</var>
                        <var class="week">{{item.week}}</var>
                        <dfn class="choice" v-show="item.timestamp == dayIndex"><img src="https://ts.zlimg.com/v2/h5/jd/order_sub_choose.png"/></dfn>
                    </div>
                </div>
    	    </div>
    	    <span class="hint">{{methodHint}}</span>
    	</div>
    </div>
</template>

<script>
    import Distribution from '@/views/index/order/distribution/pop_list.js';
    import '@/views/index/order/distribution/pop_list.scss';

    export default Distribution;
</script>