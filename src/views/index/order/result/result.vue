<template>
	<div id="result" class="tm-result">
	    <div class="header">
            <div class="title">
                <var :class="showImg ? 'complete' : 'complete fail'"></var>
                <em>{{showTitle}}</em>
            </div>
            <span class="hint">{{showContent}}</span>
            <div class="buttons">
                <div class="left">
                	<span class="button" v-touch:tap="{event: goDetails, params:[ ]}">查看订单</span>
                </div>
                <div class="right">
                	<span class="button" v-touch:tap="{event: goIndex, params:[ ]}">返回首页</span>
                </div>
            </div>
        </div>
        <div class="resultimg"><img class="follow" src="https://ts.zlimg.com/jd/2/paySuccess_scan_follow.png"/></div>
        
	</div>
</template>

<script>
    import Result from '@/views/index/order/result/result.js';
    import '@/views/index/order/result/result.scss';

    export default Result;
</script>