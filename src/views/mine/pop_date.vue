<template>
    <div id="pop_date" class="tm-mine-pop_date">
        <div class="null" v-touch:tap="{ event: cellHref, params: ['/mine/profile'] }"></div>
    	<div class="time">
    	    <div class="title">
                <span class="name">选择宝宝生日</span>
                <span class="confirm" v-touch:tap="{ event: cellHref, params: ['/mine/order/confirm'] }">确定</span>
            </div>
            <div class="choice">
            	<div class="cell years">
            		<em class="label">年</em>
            		<span id="pop_date_year" class="list" v-on:scroll=" onDateScroll(1, $event)">
            			<dfn class="item" v-for="(item,index) in yearItems" v-bind:class="item==yearSelected ? 'selected':''">{{item}}</dfn>
            		</span>
            	</div>
            	<div class="cell months">
            		<em class="label">月</em>
            		<span id="pop_date_month" class="list" v-on:scroll=" onDateScroll(2, $event)">
            			<dfn class="item" v-for="(item,index) in monthItems" v-bind:class="item==monthSelected ? 'selected':''">{{item}}</dfn>
            		</span>
            	</div>
            	<div class="cell days">
            		<em class="label">日</em>
            		<span id="pop_date_day" class="list" v-on:scroll=" onDateScroll(3, $event)">
            			<dfn class="item" v-for="(item,index) in dayItems" v-bind:class="item==daySelected ? 'selected':''">{{item}}</dfn>
            		</span>
            	</div>
            	<div class="middle"></div>
            </div>
    	</div>
    </div>
</template>

<script>
    import ProfileDate from '@/views/mine/pop_date.js'
    import '@/views/mine/pop_date.scss'
    
    export default ProfileDate;
</script>
