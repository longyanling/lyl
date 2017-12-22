<template>
    <div id="return" class="tm-mine-order-return">
    	<div class="form">
    		<span class="cell" v-touch:tap="{event:goExpress, params:[]}">
    			<em>快递公司</em>
    			<dfn class="arrow">{{express}}</dfn>
    		</span>
    		<span class="cell">
    			<em>快递单号</em>
    			<dfn><input class="text" placeholder="请输入寄出的快递单号" v-model="oddNumber"/></dfn>
    		</span>
    	</div>
    	<div class="tips">
    		填写快递单号，有助于您的订单更快完成退押
    	</div>
        <div class="address">
            <em><var>归还地址</var> 北京市  通州区   马驹桥镇   东田阳村临31号</em>
            <em><var></var>朝聚鑫大院果麦书库对面</em>
            <em><var>收件人</var> 徐硕  139-1079-9325</em>
        </div>
        
        <div class="controls">
        	<a class="button submit" v-touch:tap="{ event: submit, params: []}">确认提交</a>
        </div>
    </div>
</template>

<script>
    import Return from '@/views/mine/order/return.js';
    import '@/views/mine/order/return.scss';
    
    export default Return;
</script>