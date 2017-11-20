<template>
    <div id="pop_distribution" class="tm-order-pop_distribution">
    	<div class="null" v-touch:tap="{ event: cellHref, params: ['/mine/order/confirm'] }"></div>
    	<div class="content">
    		<div class="title">
    		    <span class="name">配送信息</span>
    		    <span class="confirm" v-touch:tap="{ event: cellHref, params: ['/mine/order/confirm'] }">确定</span>
    		</div>
    	    <div class="mode">
    	    	<div class="bar"><div class="ins"></div>配送方式</div>
    	    	<div class="methods">
                    <div class="method" v-for="item in methodsItem">
                        <em class="name">{{item.title}}</em>
                        <span class="price">运费：<var class="value">{{item.money / 1000}}元</var></span>
                        <span class="desc">{{item.desc}}</span>
                        <img class="methoImg" :src="item.image" />
                        <img class="choice" src="https://ts.zlimg.com/v2/h5/jd/order_sub_choose.png"/>
                    </div>
                </div>
    	    </div>
    	    <div class="time">
    	    	<div class="bar"><div class="ins"></div>配送时间</div>
    	    	<div class="details">
                    <div class="detail" v-for="item in daysItem">
                        <var class="month">{{item.year}}/{{item.month}}</var>
                        <var class="day">{{item.day}}</var>
                        <var class="week">{{item.week}}</var>
                        <img class="choice" src="https://ts.zlimg.com/v2/h5/jd/order_sub_choose.png"/>
                    </div>
                </div>
    	    </div>
    	    <span class="footer">您所选的日期仅作为参考，在出发之前我们的客服人员会与您电话确认最终的送货日期。</span>
    	</div>
    </div>
</template>

<script>
    import Distribution from '@/views/mine/pop_distribution.js';
    import '@/views/mine/pop_distribution.scss';

    export default Distribution;
</script>