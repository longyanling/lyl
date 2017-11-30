<template>
    <div id="distribution" class="tm-order-distribution">
    	<div class="null" v-touch:tap="{ event: cellHref, params: ['/index/confirm'] }"></div>
    	<div class="content">
    		<div class="title">
    		    <span class="name">配送信息</span>
    		    <span class="confirm" v-touch:tap="{ event: InfoDetermine, params: [] }">确定</span>
    		</div>
    	    <div class="mode">
    	    	<div class="bar"><div class="ins"></div>配送方式</div>
    	    	<div class="methods">
                    <div class="method" v-for="(item, index) in methodsItem"  v-touch:tap="{ event: selectMode, params: [  item.value, item ]}" v-bind:class="item.value == modeIndex ? 'selected' : 'unselected'">
                        <em class="name" :class="(item.value == 1 && !canOnsite) || (item.value == 2 && !canPostal) ? 'nameOptional' : 'nameNotOptional'">{{item.title}}</em>
                        <span class="price" :class="(item.value == 1 && !canOnsite) || (item.value == 2 && !canPostal) ? 'nameOptional' : 'nameNotOptional'">运费：<var class="value" :class="(item.value == 1 && !canOnsite) || (item.value == 2 && !canPostal) ? 'valueOptional' : 'valueNotOptional'">{{item.money / 1000}}元</var></span>
                        <span class="desc" :class="(item.value == 1 && !canOnsite) || (item.value == 2 && !canPostal) ? 'descOptional' : 'descNotOptional'">{{item.desc}}</span>
                        <img class="methoImg" :src="item.image" />
                        <img class="choice" v-show="item.value == modeIndex" src="https://ts.zlimg.com/v2/h5/jd/order_sub_choose.png"/>
                    </div>
                </div>
    	    </div>
    	    <div class="time">
    	    	<div class="bar"><div class="ins"></div>配送时间</div>
    	    	<div class="details">
                    <div class="detail" v-for="(item, index) in daysItem" v-touch:tap="{ event: selectDay, params: [ item.timestamp, item ]}" v-bind:class="item.timestamp == daysIndex ? 'selected' : 'unselected'">
                        <var class="month">{{item.year}}/{{item.month}}</var>
                        <var class="day">{{item.day}}</var>
                        <var class="week">{{item.week}}</var>
                        <img class="choice" v-show="item.timestamp == daysIndex" src="https://ts.zlimg.com/v2/h5/jd/order_sub_choose.png"/>
                    </div>
                </div>
    	    </div>
    	    <span class="footer">{{deliveryHint}}</span>
    	</div>
    </div>
</template>

<script>
    import Distribution from '@/views/index/order/distribution/pop_list.js';
    import '@/views/index/order/distribution/pop_list.scss';

    export default Distribution;
</script>