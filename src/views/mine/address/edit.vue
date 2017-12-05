<template>
    <div id="add" class="tm-mine-address-add">
        <div class="addressadd">
        	<span class="cell">
        		<em>收货人</em>
        		<dfn><input class="text" type="text" placeholder="请输入收货人姓名" v-model="consignee" /></dfn>
        	</span>
        	<span class="cell">
        		<em></em>
        		<dfn>
                    <var :class="sex == 0 ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: sexChange, params: [0] }">男士</var>
        			<var :class="sex == 1 ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: sexChange, params: [1] }">女士</var>
        		</dfn>
        	</span>
        	<span class="cell">
        		<em>手机号码</em>
        		<dfn>
        			<input class="text" type="text" placeholder="请填写手机号码" v-model="phone" />
        		</dfn>
        	</span>
        	<span class="cell">
        		<em>收货地址</em>
        		<dfn>
        			<input class="text" type="text" placeholder="点击定位地址或小区" v-model="location" />
        		</dfn>
        	</span>
        	<span class="cell textarea">
        		<em></em>
        		<dfn>
        			<textarea class="text" placeholder="具体门牌号(例：2号楼-101室)" v-model="address" ></textarea>
        		</dfn>
        	</span>
        	<span class="cell">
        		<em></em>
        		<dfn>
        			<var :class="isDefault ? 'checkbox checked':'checkbox'" v-touch:tap="{ event: defaultCheck, params: [ ] }">设为默认收货地址</var>
        		</dfn>
        	</span>
        </div>
        <div class="controls">
        	<a class="button submit" v-touch:tap = "{event: submit, params: []}">保 存</a>
        </div>
    </div>
</template>

<script>
    import Edit from '@/views/mine/address/edit.js';
    import '@/views/mine/address/edit.scss';
    
    export default Edit;
</script>